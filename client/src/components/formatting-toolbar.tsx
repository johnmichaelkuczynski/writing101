import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Type, 
  Palette, 
  AlignLeft, 
  AlignCenter, 
  AlignJustify,
  Bold,
  Italic,
  Underline,
  Indent,
  RotateCcw,
  Space
} from 'lucide-react';

interface FormattingToolbarProps {
  onFormatChange: (styles: DocumentStyles) => void;
  currentStyles: DocumentStyles;
}

export interface DocumentStyles {
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  textColor: string;
  backgroundColor: string;
  textAlign: 'left' | 'center' | 'justify';
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  paragraphSpacing: number;
  textIndent: number;
  letterSpacing: number;
}

const defaultStyles: DocumentStyles = {
  fontSize: 16,
  fontFamily: 'Georgia',
  lineHeight: 1.6,
  textColor: '#2d3748',
  backgroundColor: '#ffffff',
  textAlign: 'justify',
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  paragraphSpacing: 1.2,
  textIndent: 1.5,
  letterSpacing: 0
};

export function FormattingToolbar({ onFormatChange, currentStyles }: FormattingToolbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const updateStyle = (key: keyof DocumentStyles, value: any) => {
    const newStyles = { ...currentStyles, [key]: value };
    onFormatChange(newStyles);
  };

  const resetToDefaults = () => {
    onFormatChange(defaultStyles);
  };

  const fontFamilies = [
    'Georgia',
    'Times New Roman',
    'Arial',
    'Helvetica',
    'Verdana',
    'Calibri',
    'Garamond',
    'Book Antiqua',
    'Palatino',
    'Minion Pro'
  ];

  return (
    <div className="border-b bg-background p-2">
      <div className="flex items-center gap-2 flex-wrap">
        {/* Font Family */}
        <Select value={currentStyles.fontFamily} onValueChange={(value) => updateStyle('fontFamily', value)}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fontFamilies.map(font => (
              <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                {font}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Font Size */}
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4" />
          <Input
            type="number"
            value={currentStyles.fontSize}
            onChange={(e) => updateStyle('fontSize', parseInt(e.target.value))}
            className="w-16"
            min="8"
            max="72"
          />
        </div>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Formatting */}
        <Button
          variant={currentStyles.fontWeight === 'bold' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('fontWeight', currentStyles.fontWeight === 'bold' ? 'normal' : 'bold')}
        >
          <Bold className="w-4 h-4" />
        </Button>

        <Button
          variant={currentStyles.fontStyle === 'italic' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('fontStyle', currentStyles.fontStyle === 'italic' ? 'normal' : 'italic')}
        >
          <Italic className="w-4 h-4" />
        </Button>

        <Button
          variant={currentStyles.textDecoration === 'underline' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('textDecoration', currentStyles.textDecoration === 'underline' ? 'none' : 'underline')}
        >
          <Underline className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Text Alignment */}
        <Button
          variant={currentStyles.textAlign === 'left' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('textAlign', 'left')}
        >
          <AlignLeft className="w-4 h-4" />
        </Button>

        <Button
          variant={currentStyles.textAlign === 'center' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('textAlign', 'center')}
        >
          <AlignCenter className="w-4 h-4" />
        </Button>

        <Button
          variant={currentStyles.textAlign === 'justify' ? 'default' : 'outline'}
          size="sm"
          onClick={() => updateStyle('textAlign', 'justify')}
        >
          <AlignJustify className="w-4 h-4" />
        </Button>

        <Separator orientation="vertical" className="h-6" />

        {/* Advanced Options */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              <Palette className="w-4 h-4 mr-1" />
              Advanced
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="start">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Line Height</Label>
                <div className="flex items-center gap-2">
                  <Space className="w-4 h-4" />
                  <Slider
                    value={[currentStyles.lineHeight]}
                    onValueChange={([value]) => updateStyle('lineHeight', value)}
                    min={1}
                    max={3}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{currentStyles.lineHeight.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Paragraph Spacing (rem)</Label>
                <Slider
                  value={[currentStyles.paragraphSpacing]}
                  onValueChange={([value]) => updateStyle('paragraphSpacing', value)}
                  min={0}
                  max={3}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm">{currentStyles.paragraphSpacing.toFixed(1)}rem</span>
              </div>

              <div className="space-y-2">
                <Label>Text Indent (rem)</Label>
                <div className="flex items-center gap-2">
                  <Indent className="w-4 h-4" />
                  <Slider
                    value={[currentStyles.textIndent]}
                    onValueChange={([value]) => updateStyle('textIndent', value)}
                    min={0}
                    max={4}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm w-8">{currentStyles.textIndent.toFixed(1)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Letter Spacing (px)</Label>
                <Slider
                  value={[currentStyles.letterSpacing]}
                  onValueChange={([value]) => updateStyle('letterSpacing', value)}
                  min={-2}
                  max={4}
                  step={0.1}
                  className="flex-1"
                />
                <span className="text-sm">{currentStyles.letterSpacing.toFixed(1)}px</span>
              </div>

              <div className="space-y-2">
                <Label>Text Color</Label>
                <Input
                  type="color"
                  value={currentStyles.textColor}
                  onChange={(e) => updateStyle('textColor', e.target.value)}
                  className="h-10"
                />
              </div>

              <div className="space-y-2">
                <Label>Background Color</Label>
                <Input
                  type="color"
                  value={currentStyles.backgroundColor}
                  onChange={(e) => updateStyle('backgroundColor', e.target.value)}
                  className="h-10"
                />
              </div>

              <Button onClick={resetToDefaults} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset to Defaults
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Reset Button */}
        <Button onClick={resetToDefaults} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

export { defaultStyles };