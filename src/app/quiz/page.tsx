'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { BottomTabNavigator } from '@/components/bottom-tab-navigator';
import { Body, H3, H4, Highlight, Lead } from '@/components/typography';
import { convertScoreToBoolean, generateQuizPrompt } from '@/lib/ai-helpers';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { RadioGroup, RadioGroupItem } from '@/registry/new-york-v4/ui/radio-group';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { AIRequest } from '@/services/google-ai';
import { UserPreferences, defaultPreferences, getUserPreferences } from '@/services/user-preferences';
import { AIQuizResponse } from '@/types/ai-respons.type';
import { useMutation } from '@tanstack/react-query';

import { Settings } from 'lucide-react';

export default function QuizPage() {
  const router = useRouter();
  const [previousAnswers, setPreviousAnswers] = useState<string | null>(null);
  const [response, setResponse] = useState<AIQuizResponse | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const mutation = useMutation({
    mutationFn: (prompt: string) => AIRequest(prompt),
    onSuccess: (data) => {
      setResponse(data || '');
    }
  });

  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  useEffect(() => {
    const preferences = getUserPreferences();
    setPreferences(preferences);
  }, []);

  const handleStart = () => {
    mutation.mutate(
      generateQuizPrompt({
        userAnswer: selectedOption || '',
        options: response?.nextTask?.options || [],
        question: response?.nextTask?.question || '',
        level: preferences.level,
        themes: preferences.themes,
        topics: preferences.topics
      })
    );
    setPreviousAnswers(selectedOption);
    setSelectedOption(null);
  };

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
              <H4>{!response ? 'To start press submit answer' : 'Give an answer'}</H4>
            </CardHeader>
            <CardContent>
              <Lead>{response?.nextTask?.question}</Lead>
              <Separator className='my-4' />
              <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                {response?.nextTask?.options.map((option) => (
                  <div
                    key={option}
                    className='flex cursor-pointer items-center gap-2'
                    onClick={() => setSelectedOption(option)}>
                    <RadioGroupItem value={option} />
                    <div className='flex text-wrap'>
                      <Body>{option}</Body>
                    </div>
                  </div>
                ))}
              </RadioGroup>
              {response && <Separator className='my-4' />}
              {mutation.isPending && <Body>Checking your answer...</Body>}
              {response && !mutation.isPending && (
                <>
                  <div className='flex flex-col'>
                    <H4>{convertScoreToBoolean(response?.score || 0) ? 'Correct' : 'Incorrect'}</H4>
                    <Body>
                      <Highlight>Feedback: </Highlight>
                      {response?.feedback}
                      <br />
                      <Highlight>Correct answer:</Highlight>
                      <br />
                      {response?.correctAnswer}
                      <br />
                      <Highlight>Your answer:</Highlight>
                      <br />
                      {previousAnswers || 'N/A'}
                    </Body>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Button onClick={handleStart} disabled={mutation.isPending}>
            Submit Answer
          </Button>
        </CardContent>
      </Card>
      <BottomTabNavigator />
    </div>
  );
}
