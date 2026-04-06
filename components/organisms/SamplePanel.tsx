'use client';

import { Panel } from '@/types/domain/Panel';

type SamplePanelProps = {
  panel: Panel;
};

export default function SamplePanel({ panel }: SamplePanelProps) {
  return <div className="organism-panel organism-panel--centered samplePanel"></div>;
}
