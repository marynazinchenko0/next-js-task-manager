"use client"
import {useState} from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from '@/components/ui/checkbox'
import {priorityLabels} from '@/constants/priorityLabels'


export const ListFilter = () => {
  const [selectedDeadline, setSelectedDeadline] = useState('')
  const [sortedPriority, setSortedPriority] = useState('')
  const [selectedPriority, setSelectedPriority] = useState<string[]>([]);

  const handlePriorityCheckboxChange = (isChecked: boolean, itemKey: string) => {
    isChecked
      ? setSelectedPriority([...selectedPriority, itemKey])
      : setSelectedPriority(
        selectedPriority.filter(
          (value) => value !== itemKey
        )
      )
  }

  const clearPriorityFilter = () => {
    setSortedPriority('')
    setSelectedPriority([])
  }

  return (
    <div className="grid gap-4">
      <p>Deadline</p>
      <Select value={selectedDeadline} onValueChange={value => setSelectedDeadline(value)}>
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
      {
        selectedDeadline &&
          <button onClick={() => setSelectedDeadline('')} className="underline text-xs text-end">
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

      {
        Object.entries(priorityLabels).map(([key, value], index) => (
          <div key={key} className="flex items-center space-x-2">
            <Checkbox value={key}
                      checked={selectedPriority.includes(key)}
                      onCheckedChange={(checked) => handlePriorityCheckboxChange(checked as boolean, key)}
                      id={key}/>
            <label
              htmlFor={key}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {value}
            </label>
          </div>
        ))
      }
      {
        (selectedPriority.length || sortedPriority) &&
          <button onClick={() => clearPriorityFilter()} className="underline text-xs text-end">
              Clear filter
          </button>
      }
    </div>
  )
}

export default ListFilter