"use client"

import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'ISA/WSF' },
    position: { x: 50, y: 200 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '2',
    type: 'default',
    data: { label: 'Landsat LST' },
    position: { x: 50, y: 100 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '3',
    type: 'default',
    data: { label: 'KDE' },
    position: { x: 250, y: 200 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '4',
    type: 'default',
    data: { label: 'Align' },
    position: { x: 450, y: 200 },
    style: {
      background: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      padding: '20px',
      width: '100px',
      height: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '5',
    type: 'default',
    data: { label: 'Calculate correlation' },
    position: { x: 650, y: 200 },
    style: {
      background: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      padding: '20px',
      width: '150px',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  {
    id: '6',
    type: 'default',
    data: { label: 'LST & WSF' },
    position: { x: 850, y: 100 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '7',
    type: 'default',
    data: { label: 'Vector Units' },
    position: { x: 850, y: 300 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
  {
    id: '8',
    type: 'default',
    data: { label: 'Predict or Simulate' },
    position: { x: 1050, y: 200 },
    style: {
      background: '#66BB6A',
      color: 'white',
      border: 'none',
      borderRadius: '50%',
      padding: '20px',
      width: '120px',
      height: '120px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '14px',
      fontWeight: 500,
      textAlign: 'center',
    },
  },
  {
    id: '9',
    type: 'output',
    data: { label: 'Dynamic or Static Maps' },
    position: { x: 1250, y: 200 },
    style: {
      background: '#64B5F6',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      padding: '10px 20px',
      fontSize: '14px',
      fontWeight: 500,
    },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-3', source: '1', target: '3' },
  { id: 'e2-4', source: '2', target: '4' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e5-8', source: '5', target: '8' },
  { id: 'e6-8', source: '6', target: '8' },
  { id: 'e7-8', source: '7', target: '8' },
  { id: 'e8-9', source: '8', target: '9' },
];

export default function UnderConstructionRDPage() {
  return (
    <div className="p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg h-[calc(100vh-7rem)]">
        <h1 className="text-2xl font-bold p-4 border-b">
          Deriving Surface Urban Heat Island Intensity
        </h1>
        <div className="h-[calc(100%-4rem)]">
          <ReactFlow
            nodes={initialNodes}
            edges={initialEdges}
            fitView
            attributionPosition="bottom-right"
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}