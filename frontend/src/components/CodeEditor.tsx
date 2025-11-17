import React, { useState } from 'react';
import './CodeEditor.css';

interface CodeEditorProps {
  language?: string;
  initialCode?: string;
  onExecute?: (code: string) => Promise<{ output: string; error?: string }>;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language = 'java',
  initialCode = '',
  onExecute,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async () => {
    if (!onExecute) return;

    setIsExecuting(true);
    setOutput('Executing...');

    try {
      const result = await onExecute(code);
      setOutput(result.output || result.error || 'No output');
    } catch (error) {
      setOutput(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="code-editor-container">
      <div className="code-editor-header">
        <span className="language-badge">{language.toUpperCase()}</span>
        {onExecute && (
          <button
            className="execute-button"
            onClick={handleExecute}
            disabled={isExecuting || readOnly}
          >
            {isExecuting ? '⏳ Running...' : '▶️ Run Code'}
          </button>
        )}
      </div>

      <textarea
        className="code-editor-textarea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        placeholder={`Write your ${language} code here...`}
      />

      {output && (
        <div className="code-output">
          <div className="output-header">Output:</div>
          <pre className="output-content">{output}</pre>
        </div>
      )}

      <div className="editor-note">
        💡 Note: Full Monaco Editor integration with syntax highlighting coming soon!
      </div>
    </div>
  );
};
