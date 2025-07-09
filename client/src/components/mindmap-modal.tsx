import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Loader2, Map, Network, BookOpen, ArrowLeft } from 'lucide-react';
import MindMapViewer from './mindmap-viewer';
import MetaMindMapViewer from './meta-mindmap-viewer';
import { useMindMapStructure, useLocalMindMap, useMetaMindMap } from '@/hooks/use-mindmaps';
import type { AIModel } from '@shared/schema';

interface MindMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedModel: AIModel;
  initialTab?: 'meta' | 'local';
  initialSectionId?: string;
  onSectionSelect?: (sectionId: string) => void;
  onAskQuestion?: (question: string) => void;
  onRewrite?: (text: string) => void;
}

export default function MindMapModal({
  isOpen,
  onClose,
  selectedModel,
  initialTab = 'meta',
  initialSectionId,
  onSectionSelect,
  onAskQuestion,
  onRewrite
}: MindMapModalProps) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedSectionId, setSelectedSectionId] = useState(initialSectionId || '');

  const { data: structure, isLoading: structureLoading } = useMindMapStructure(selectedModel);
  const { data: metaMap, isLoading: metaLoading } = useMetaMindMap(selectedModel);
  const { data: localMap, isLoading: localLoading } = useLocalMindMap(
    selectedSectionId, 
    selectedModel
  );

  const handleSectionClick = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setActiveTab('local');
    onSectionSelect?.(sectionId);
  };

  const handleViewLocalMap = (sectionId: string) => {
    setSelectedSectionId(sectionId);
    setActiveTab('local');
  };

  const handleBackToMeta = () => {
    setActiveTab('meta');
    setSelectedSectionId('');
  };

  const handleViewPassage = (sectionId: string) => {
    onSectionSelect?.(sectionId);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="flex items-center gap-2">
            <Network className="w-5 h-5" />
            Tractatus Mind Maps
            <Badge variant="outline" className="ml-2">
              {selectedModel}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden h-[calc(90vh-120px)]">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full h-full flex flex-col">
            <div className="px-6 pb-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="meta" className="flex items-center gap-2">
                  <Map className="w-4 h-4" />
                  Book Structure
                </TabsTrigger>
                <TabsTrigger value="local" className="flex items-center gap-2">
                  <Network className="w-4 h-4" />
                  Section Mind Map
                  {selectedSectionId && (
                    <Badge variant="secondary" className="ml-1 text-xs">
                      {structure?.modules.find(m => m.id === selectedSectionId)?.title.split(' - ')[0]}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden h-[calc(100%-80px)]">
              <TabsContent value="meta" className="h-full m-0">
                {metaLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating book structure mind map...</span>
                    </div>
                  </div>
                ) : metaMap ? (
                  <div className="w-full h-full">
                    <MetaMindMapViewer
                      metaMap={metaMap}
                      onSectionClick={handleSectionClick}
                      onViewLocalMap={handleViewLocalMap}
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Network className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Failed to load book structure</p>
                      <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="local" className="h-full m-0">
                {!selectedSectionId ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium mb-2">Select a Section</p>
                      <p className="text-muted-foreground mb-4">
                        Choose a section from the book structure to view its mind map
                      </p>
                      <Button onClick={() => setActiveTab('meta')}>
                        <Map className="w-4 h-4 mr-2" />
                        View Book Structure
                      </Button>
                    </div>
                  </div>
                ) : localLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Generating section mind map...</span>
                    </div>
                  </div>
                ) : localMap ? (
                  <div className="h-full flex flex-col">
                    <div className="px-6 py-2 border-b bg-muted/30">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleBackToMeta}
                        className="mb-2"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Book Structure
                      </Button>
                    </div>
                    <div className="flex-1 w-full h-full">
                      <MindMapViewer
                        mindMap={localMap}
                        onAskQuestion={onAskQuestion}
                        onRewrite={onRewrite}
                        onViewPassage={handleViewPassage}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Network className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Failed to load section mind map</p>
                      <Button variant="outline" onClick={() => window.location.reload()}>
                        Retry
                      </Button>
                    </div>
                  </div>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}