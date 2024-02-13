import React, { useState } from 'react';

const CreateResumePage : React.FC = () => {
    const [skillInput, setSkillInput] = useState('');
    const [skills,setSkills] = useState<string[]> ([]);
    const [education,setEducation] = useState<{school:string,degree:string,major:string}[]>([]);
    const [experiences, setExperiences] = useState<{position:string;company:string;description:string;aiAssistance:boolean}[]>([]);
    const [showSummaryInput, setShowSummaryInput] = useState<boolean>(false);
    const [summary, setSummary] = useState<string>('');
    const [summaryAiAssistance, setSummaryAiAssistance] = useState<boolean>(false);

    const handleSkillAdd = (skill:string)=>{
        setSkills([...skills,skill]);
    };

    const handleEducationAdd = (school:string, degree: string, major: string) => {
        setEducation([...education,{school,degree,major}]);
    };

    const handleExperienceAdd = (position:string, company:string, description:string, aiAssistance:boolean) => {
        setExperiences([...experiences,{position,company,description,aiAssistance}]);
    };
    
    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    return (
        <div className="container mx-auto py-8">
      <div className="flex justify-center items-start space-x-8">
        {/* Skills Column */}
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-4">Skills</h2>
          <div className="flex mb-2">
            <input
              type="text"
              placeholder="Enter skill"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mr-2"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
            <button
              onClick={() => handleSkillAdd(skillInput)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              +
            </button>
          </div>
          <ul className="mt-4">
            {skills.map((skill, index) => (
              <li key={index} className="mb-2">
                {skill}
              </li>
            ))}
          </ul>
        </div>

        {/* Experiences Column */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold mb-4">Experiences</h2>
          {/* Experience Input Fields */}
        </div>

        {/* Education Column */}
        <div className="w-1/4">
          <h2 className="text-lg font-semibold mb-4">Education</h2>
          {/* Education Input Fields */}
        </div>
      </div>

      {/* Summary Input */}
      {showSummaryInput && (
        <div className="w-full mt-8 text-center">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <input
            type="text"
            placeholder="Enter summary"
            value={summary}
            onChange={handleResumeChange}
            className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
          />
          {/* Checkbox for AI assistance */}
          <button
            onClick={() => setShowSummaryInput(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save Summary
          </button>
        </div>
      )}

      {/* Add Summary Button */}
      <button
        onClick={() => setShowSummaryInput(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
      >
        Add Summary
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 block mx-auto"
      >
        Submit
      </button>
    </div>
  );
};
export default CreateResumePage;