'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { BottomTabNavigator } from '@/components/bottom-tab-navigator';
import { Body, H3, H4, Highlight } from '@/components/typography';
import { convertScoreToBals, generatePrompt } from '@/lib/ai-helpers';
import { submitFormById } from '@/lib/utils';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/registry/new-york-v4/ui/form';
import { Textarea } from '@/registry/new-york-v4/ui/textarea';
import { AIRequest } from '@/services/google-ai';
import { UserPreferences, defaultPreferences, getUserPreferences } from '@/services/user-preferences';
import { AIResponse } from '@/types/ai-respons.type';
import { useMutation } from '@tanstack/react-query';

import { Settings } from 'lucide-react';
import { useForm } from 'react-hook-form';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */

const Page = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
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
    mutation.mutate(
      generatePrompt({
        userAnswer: values.answer,
        question: response?.nextTask.ukrainian || '',
        level: preferences.level,
        topics: preferences.topics,
        textLength: preferences.textLength
      })
    );
  };

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        form.handleSubmit(handleSubmit)();
      }
    };
    document.addEventListener('keydown', listener);

    const preferences = getUserPreferences();
    setPreferences(preferences);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, []);

  const router = useRouter();

  const isStart = !response;

  return (
    <div className='relative h-full pb-16 md:p-4'>
      <Card className='h-full border-none md:border'>
        <CardHeader className='aligh-center flex flex-row items-center justify-between'>
          <H3 className='mb-0'>AI English Teacher</H3>
          <Button variant='ghost' size='icon' onClick={() => router.push('/settings')}>
            <Settings size={20} />
          </Button>
        </CardHeader>
        <CardContent className='flex h-full flex-col gap-4'>
          <Card>
            <CardHeader>
              <H4>{isStart ? 'To start press start' : 'Translate this sentence'}</H4>
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
              <Button type='submit' className='hidden'></Button>
            </form>
          </Form>
          <Button
            disabled={mutation.isPending}
            onClick={() => submitFormById('form')}
            className='mt-auto'
            type='submit'>
            {mutation.isPending ? 'Submitting...' : isStart ? 'Start' : 'Submit'}
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
      <BottomTabNavigator />
    </div>
  );
};

export default Page;
