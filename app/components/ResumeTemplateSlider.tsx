import React, { useState } from 'react';

interface ResumeTemplateSliderProps {
  onTemplateSelect: (templateId: number) => void;
}

const ResumeTemplateSlider: React.FC<ResumeTemplateSliderProps> = ({ onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(0);

  const handleTemplateChange = (templateId: number) => {
    setSelectedTemplate(templateId);
    onTemplateSelect(templateId);
  };

  return (
    <div className="flex justify-center space-x-4">
      <button
        className={`px-4 py-2 rounded ${
          selectedTemplate === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleTemplateChange(0)}
      >
        Template 1
      </button>
      <button
        className={`px-4 py-2 rounded ${
          selectedTemplate === 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
        }`}
        onClick={() => handleTemplateChange(1)}
      >
        Template 2
      </button>
    </div>
  );
};

export default ResumeTemplateSlider;