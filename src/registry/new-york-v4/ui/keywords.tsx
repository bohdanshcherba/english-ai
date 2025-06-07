'use client';

import { useState } from 'react';

import { Button } from '@/registry/new-york-v4/ui/button';
import { Input } from '@/registry/new-york-v4/ui/input';

import { XIcon } from 'lucide-react';

export function Keywords({
  keywords,
  setKeywords,
  placeholder = 'Enter keywords'
}: {
  keywords: string[];
  setKeywords: (keywords: string[]) => void;
  placeholder?: string;
}) {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  const handleAddKeyword = () => {
    if (inputValue.trim() !== '') {
      setKeywords([...keywords, inputValue.trim()]);
      setInputValue('');
    }
  };
  const handleRemoveKeyword = (index: number) => {
    const updatedKeywords = [...keywords];
    updatedKeywords.splice(index, 1);
    setKeywords(updatedKeywords);
  };

  return (
    <div className='w-full max-w-md'>
      <div className='flex items-center space-x-2'>
        <Input
          type='text'
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          className='flex-1'
        />
        <Button onClick={handleAddKeyword}>Add</Button>
      </div>
      <div className='mt-4 flex flex-wrap gap-2'>
        {keywords.map((keyword, index) => (
          <div
            key={index}
            className='bg-muted text-muted-foreground inline-flex items-center rounded-full px-3 py-1 text-sm font-medium'>
            {keyword}
            <Button
              variant='ghost'
              size='icon'
              className='-mr-1 ml-2 h-4 w-4 hover:bg-transparent hover:text-red-500'
              onClick={() => handleRemoveKeyword(index)}>
              <XIcon className='h-4 w-4' />
              <span className='sr-only'>Remove {keyword}</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
