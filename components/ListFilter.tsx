"use client"
import {SetStateAction, useEffect, useState} from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {priorityLabels} from '@/constants/priorityLabels'
import {usePathname, useRouter} from 'next/navigation';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label"

export const ListFilter = () => {
  const router = useRouter();
  const pathName = usePathname();

  const [selectedDeadline, setSelectedDeadline] = useState('')
  const [sortedDeadline, setSortedDeadline] = useState('')
  const [sortedPriority, setSortedPriority] = useState('')
  const [selectedPriority, setSelectedPriority] = useState('all');

  const updateSearchParams = (paramsToUpdate: { [s: string]: unknown } | ArrayLike<unknown>) => {
    const url = new URL(pathName, window.location.origin);
    Object.entries(paramsToUpdate).forEach(([key, value]) => {
      if (value) {
        if (typeof value === "string") {
          url.searchParams.set(key, value);
        }
      } else {
        url.searchParams.delete(key);
      }
    });
    router.push(url.pathname + url.search);
  };


  useEffect(() => {
    updateSearchParams({
      sortBy: sortedDeadline,
      priority: selectedPriority !== 'all' ? selectedPriority : null,
      deadline: selectedDeadline,
    });
  }, [sortedDeadline, selectedPriority, selectedDeadline])


  const clearState = (setStateFunction: {
    (value: SetStateAction<string>): void;
  }) => {
    setStateFunction('');
  }

  const clearSearchParams = (paramName: string) => {
    const url = new URL(pathName, window.location.origin);
    url.searchParams.delete(paramName);
    const path = url.pathname + url.search;
    router.push(path);
  }

  const clearPriorityFilter = () => {
    clearState(setSortedPriority);
    clearState(setSelectedPriority);
    clearSearchParams('priority');
  }

  const clearDeadlineFilter = () => {
    clearState(setSelectedDeadline);
    clearState(setSortedDeadline);
    clearSearchParams('deadline');
    clearSearchParams('sortBy');
  }


  return (
    <div className="grid gap-4">
      <p>Deadline</p>
      <Select value={sortedDeadline} onValueChange={value => setSortedDeadline(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by deadline"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='nearest'>Nearest deadline</SelectItem>
            <SelectItem value='furthest'>Furthest deadline</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>


      <input
        id="deadline"
        name="deadline"
        type="date"
        value={selectedDeadline}
        onChange={e => setSelectedDeadline(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-200"
      />

      {
        (sortedDeadline || selectedDeadline) &&
          <button onClick={() => clearDeadlineFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }

      <hr/>


      <p>Priority</p>

      <Select value={sortedPriority} onValueChange={value => setSortedPriority(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by priority"/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='low-first'>Low priority first</SelectItem>
            <SelectItem value='high-first'>High priority first</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <RadioGroup defaultValue="all" value={selectedPriority} onValueChange={setSelectedPriority}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="all" id="r1"/>
          <Label htmlFor="r1">All</Label>
        </div>
        {
          Object.entries(priorityLabels).map(([key, value], index) => (
            <div key={key} className="flex items-center space-x-2">
              <RadioGroupItem value={key} id={`r${key}`}/>
              <Label htmlFor={`r${key}`}>{value}</Label>
            </div>
          ))
        }
      </RadioGroup>
      {
        ((selectedPriority && selectedPriority !== 'all') || sortedPriority) &&
          <button onClick={() => clearPriorityFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }
    </div>
  )
}

export default ListFilter