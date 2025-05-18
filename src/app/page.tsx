'use client';

import { useEffect, useState } from 'react';

import { Body, H3, H4, Highlight } from '@/components/typography';
import { convertScoreToBals, generatePrompt } from '@/lib/ai-helpers';
import { submitFormById } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/registry/new-york-v4/ui/form';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { AIRequest } from '@/services/google-ai';
import { AIResponse } from '@/types/ai-respons.type';
import { useMutation } from '@tanstack/react-query';

import { useForm } from 'react-hook-form';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */

const Page = () => {
  const [response, setResponse] = useState<AIResponse | null>(null);
  const mutation = useMutation({
    mutationFn: (prompt: string) => AIRequest(prompt),
    onSuccess: (data) => {
      form.reset();
      setResponse(data || '');
    }
  });

  const form = useForm({
    defaultValues: {
      answer: ''
    }
  });

  const handleSubmit = (values: any) => {
    mutation.mutate(generatePrompt({ userAnswer: values.answer, question: response?.nextTask.ukrainian || '' }));
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        form.handleSubmit(handleSubmit)();
      }
    };
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  return (
    <div className='h-full md:p-4'>
      <Card className='h-full border-none md:border'>
        <CardHeader className='flex items-center justify-center'>
          <H3>AI English Teacher</H3>
        </CardHeader>
        <CardContent className='flex h-full flex-col gap-4'>
          <Card>
            <CardHeader>
              <H4>Translate this sentence</H4>
            </CardHeader>
            <CardContent>
              <Body>{response?.nextTask.ukrainian}</Body>
            </CardContent>
          </Card>
          <Form {...form}>
            <form id='form' onSubmit={form.handleSubmit(handleSubmit)} className='grid w-full gap-6'>
              <FormField
                control={form.control}
                name='answer'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder='Enter your answer' className='h-30 w-full resize-none' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type='submit' className='hidden'>
                Submit
              </Button>
            </form>
          </Form>
          <Button
            disabled={mutation.isPending}
            onClick={() => submitFormById('form')}
            className='mt-auto'
            type='submit'>
            {mutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
          {mutation.isPending && <Body>Checking your answer...</Body>}
          {response && !mutation.isPending && (
            <div className='flex flex-col'>
              <H3>Feedback</H3>
              <Body>
                <Highlight>Your score: </Highlight>
                {convertScoreToBals(response?.score || 0)}/10
                <br />
                <Highlight>Feedback: </Highlight>
                {response?.feedback}
                <br />
                <Highlight>Correct answer:</Highlight>
                <br />
                {response?.correctAnswer}
              </Body>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
