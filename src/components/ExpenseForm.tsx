import React, { useRef, useCallback, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES, CATEGORY_CONFIG, ExpenseCategory, Expense } from '@/types/expense';
import { Plus, DollarSign, Tag, Calendar, FileText } from 'lucide-react';

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, 'id' | 'createdAt'>) => void;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAddExpense }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('food');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // useRef for form field focus management
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);

  // Focus description field on mount
  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  // useCallback for optimized event handlers
  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  }, []);

  const handleCategoryChange = useCallback((value: ExpenseCategory) => {
    setCategory(value);
  }, []);

  const handleDateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      amountRef.current?.focus();
      return;
    }

    onAddExpense({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      date,
    });

    // Reset form and refocus
    setDescription('');
    setAmount('');
    setCategory('food');
    setDate(new Date().toISOString().split('T')[0]);
    descriptionRef.current?.focus();
  }, [description, amount, category, date, onAddExpense]);

  return (
    <form onSubmit={handleSubmit} className="glass-card rounded-xl p-6 animate-slide-up">
      <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5 text-primary" />
        Add Expense
      </h2>
      
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Description
          </Label>
          <Input
            ref={descriptionRef}
            id="description"
            placeholder="What did you spend on?"
            value={description}
            onChange={handleDescriptionChange}
            className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="amount" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                ref={amountRef}
                id="amount"
                type="text"
                inputMode="decimal"
                placeholder="0.00"
                value={amount}
                onChange={handleAmountChange}
                className="pl-7 bg-secondary/50 border-border/50 focus:border-primary transition-colors"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="date" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={handleDateChange}
              className="bg-secondary/50 border-border/50 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category" className="text-sm font-medium text-muted-foreground flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Category
          </Label>
          <Select value={category} onValueChange={handleCategoryChange}>
            <SelectTrigger className="bg-secondary/50 border-border/50 focus:border-primary transition-colors">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat} className="focus:bg-secondary">
                  <span className="flex items-center gap-2">
                    <span>{CATEGORY_CONFIG[cat].icon}</span>
                    <span>{CATEGORY_CONFIG[cat].label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" variant="income" size="lg" className="w-full mt-2">
          <Plus className="w-5 h-5" />
          Add Expense
        </Button>
      </div>
    </form>
  );
};

export default ExpenseForm;
