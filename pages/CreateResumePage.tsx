import React, { useState } from 'react';

const CreateResumePage : React.FC = () => {
    const [skillInput, setSkillInput] = useState('');
    const [skills,setSkills] = useState<string[]> ([]);
    const [educationInput, setEducationInput] = useState({
        school: '',
        degree: '',
        major: '',
        gpa: '', 
        startDate: '', 
        endDate: '' 
      });
    const [education,setEducation] = useState<{school:string,degree:string,major:string; gpa: string; startDate: string; endDate: string; }[]>([]);
    const [experiences, setExperiences] = useState<{position:string;company:string;description:string;aiAssistance:boolean}[]>([]);
    const [showSummaryInput, setShowSummaryInput] = useState<boolean>(false);
    const [summary, setSummary] = useState<string>('');
    const [summaryAiAssistance, setSummaryAiAssistance] = useState<boolean>(false);

    const handleSkillAdd = (skill:string)=>{
        setSkills([...skills,skill]);
        setSkillInput('');
    };

    const handleEducationAdd = (school: string, degree: string, major: string, gpa: string, startDate: string, endDate: string) => {
        setEducation([...education, { school, degree, major, gpa, startDate, endDate }]);
        setEducationInput({ school: '', degree: '', major: '', gpa: '', startDate: '', endDate: '' });
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
          <div className="mb-2">
            <input
              type="text"
              placeholder="Enter school"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
              value={educationInput.school}
              onChange={(e) => setEducationInput({ ...educationInput, school: e.target.value })}
            />
            <select
              value={educationInput.degree}
              onChange={(e) => setEducationInput({ ...educationInput, degree: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
            >
                <option value="">Select Degree</option>
                <option value="HS">High School Diploma</option>
                <option value="AA">Associate of Arts (AA)</option>
                <option value="AS">Associate of Science (AS)</option>
                <option value="AAA">Associate of Applied Arts (AAA)</option>
                <option value="AAS">Associate of Applied Science (AAS)</option>
                <option value="BA">Bachelor of Arts (BA)</option>
                <option value="BS">Bachelor of Science (BS)</option>
                <option value="BAA">Bachelor of Applied Arts (BAA)</option>
                <option value="BAS">Bachelor of Applied Science (BAS)</option>
                <option value="B.Arch.">Bachelor of Architecture (B.Arch.)</option>
                <option value="BBA">Bachelor of Business Administration (BBA)</option>
                <option value="BFA">Bachelor of Fine Arts (BFA)</option>
                <option value="BSN">Bachelor of Science in Nursing (BSN)</option>
                <option value="MA">Master of Arts (MA)</option>
                <option value="MS">Master of Science (MS)</option>
                <option value="MEng">Master of Engineering (MEng)</option>
                <option value="M.E.">Master of Architecture (M.E.)</option>
                <option value="MPA">Master of Public Administration (MPA)</option>
                <option value="MSW">Master of Social Work (MSW)</option>
                <option value="MBA">Master of Business Administration (MBA)</option>
                <option value="MPH">Master of Public health (MPH)</option>
                <option value="DA">Doctor of Arts (DA)</option>
                <option value="DBA">Doctor of Business Administration (DBA)</option>
                <option value="JCD">Doctor of Canon Law (JCD)</option>
                <option value="DDes">Doctor of Design (DDes)</option>
                <option value="DEng">Doctor of Engineering (DEng)</option>
                <option value="EdD">Doctor of Education (EdD)</option>
                <option value="DFA.">Doctor of Fine Arts (DFA.)</option>
                <option value="DHL">Doctor of Hebrew Letters (DHL)</option>
                <option value="JSD, SJD">Doctor of Juridical Science (JSD, SJD)</option>
                <option value="DMA">Doctor of Musical Arts (DMA)</option>
                <option value="DME">Doctor of Music Education (DME)</option>
                <option value="DML">Doctor of Modern Languages (DML)</option>
                <option value="DNSc">Doctor of Nursing Science (DNSc)</option>
                <option value="PhD">Doctor of Philosophy (PhD)</option>
                <option value="DPH">Doctor of Public Health (DPH)</option>
                <option value="STD">Doctor of Sacred Theology (STD)</option>
                <option value="DSc, ScD">Doctor of Science (DSc, ScD)</option>
                <option value="ThD">Doctor of Theology (ThD)</option>
            </select>
            <input
              type="text"
              placeholder="Enter major"
              className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
              value={educationInput.major}
              onChange={(e) => setEducationInput({ ...educationInput, major: e.target.value })}
            />
              <input
                type="number"
                step="0.01"
                placeholder="Enter GPA"
                value={educationInput.gpa}
                onChange={(e) => setEducationInput({ ...educationInput, gpa: e.target.value.toString() })}
                className="border border-gray-300 rounded-md px-4 py-2 mb-2"
            />
            <div className="flex mb-2">
                <input
                type="date"
                value={educationInput.startDate}
                onChange={(e) => setEducationInput({ ...educationInput, startDate: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 mr-2"
                />
                <input
                type="date"
                value={educationInput.endDate}
                onChange={(e) => setEducationInput({ ...educationInput, endDate: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2"
                />
            </div>
           <button
                onClick={() => handleEducationAdd(educationInput.school, educationInput.degree, educationInput.major,educationInput.gpa,educationInput.startDate,educationInput.endDate)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Education
            </button>
          </div>
          <ul className="mt-4">
            {education.map((item, index) => (
              <li key={index} className="mb-2">
                {item.school} - {item.degree} - {item.major}
              </li>
            ))}
          </ul>
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