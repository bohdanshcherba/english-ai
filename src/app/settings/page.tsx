'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { H4 } from '@/components/typography';
import { Button } from '@/registry/new-york-v4/ui/button';
import { Card, CardContent, CardHeader } from '@/registry/new-york-v4/ui/card';
import { Keywords } from '@/registry/new-york-v4/ui/keywords';
import { Separator } from '@/registry/new-york-v4/ui/separator';
import { Slider } from '@/registry/new-york-v4/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york-v4/ui/toggle-group';
import { getUserPreferences, saveUserPreferences } from '@/services/user-preferences';

import { ChevronLeft } from 'lucide-react';

const levels = [
  {
    key: 'A1',
    title: 'A1',
    description: 'Beginner'
  },
  {
    key: 'A2',
    title: 'A2',
    description: 'Beginner'
  },
  {
    key: 'B1',
    title: 'B1',
    description: 'Intermediate'
  },
  {
    key: 'B2',
    title: 'B2',
    description: 'Intermediate'
  },
  {
    key: 'C1',
    title: 'C1',
    description: 'Advanced'
  }
];

export default function SettingsPage() {
  const router = useRouter();
  const [level, setLevel] = useState<string>('C1');
  const [textLength, setTextLength] = useState<number>(50);
  const [themes, setThemes] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const preferences = getUserPreferences();
    setLevel(preferences.level);
    setTextLength(preferences.textLength);
    setThemes(preferences.themes);
    setTopics(preferences.topics);
  }, []);

  const handleSave = () => {
    saveUserPreferences({ level, textLength, themes, topics });
    router.back();
  };

  return (
    <Card className='h-screen border-none md:border'>
      <CardHeader className='grid grid-cols-3'>
        <Link href='/'>
          <ChevronLeft />
        </Link>
        <H4 className='mb-0 text-center'>Settings</H4>
        <div />
      </CardHeader>
      <CardContent className='flex h-full flex-col gap-4'>
        <H4>Level</H4>
        <ToggleGroup
          variant='outline'
          type='single'
          className='flex'
          value={level}
          onValueChange={(value) => setLevel(value)}>
          {levels.map((level) => (
            <ToggleGroupItem variant='outline' className='flex-1' key={level.key} value={level.key}>
              {level.title}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
        <Separator />
        <H4>Text Length</H4>
        <Slider
          defaultValue={[50]}
          value={[textLength]}
          max={100}
          step={1}
          onValueChange={(value) => setTextLength(value[0])}
        />
        <Separator />
        <H4>Topics</H4>
        <Keywords keywords={topics} setKeywords={setTopics} placeholder='Enter topic' />
        <Separator />
        <H4>Preferred Grammar Themes</H4>
        <Keywords keywords={themes} setKeywords={setThemes} placeholder='Enter preferred grammar themes' />
        <Button className='mt-auto w-full' onClick={handleSave}>
          Save
        </Button>
      </CardContent>
    </Card>
  );
}
