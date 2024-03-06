import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CreateResumePage : React.FC = () => {
    const [userId, setUserId] = useState<number |string| null>(null);
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
    const [experienceInput, setExperienceInput] = useState({
      position: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
      aiAssistance: false
    });
    const [experiences, setExperiences] = useState<{position:string,company:string, startDate:String, endDate:String,description:string,aiAssistance:boolean}[]>([]);
    const [showSummaryInput, setShowSummaryInput] = useState<boolean>(false);
    const [summary, setSummary] = useState<string>('');
    const [summaryAiAssistance, setSummaryAiAssistance] = useState<boolean>(false);
    useEffect(() => {
      // Fetch user ID when the component mounts
      const fetchUserId = async () => {
          try {
              // Retrieve the user's ID from session storage
              const storedUserId = sessionStorage.getItem('userId');
              if (!storedUserId) {
                  throw new Error('User ID not found in session storage');
              }
              setUserId(storedUserId);
              console.log('User ID bla bla bla:', storedUserId);
          } catch (error) {
              console.error('Error fetching user ID:', error);
          }
      };
      fetchUserId();
  }, []);
    const handleSkillAdd = (skill:string)=>{
        setSkills([...skills,skill]);
        setSkillInput('');
    };

    const handleSkillRemove = (index: number) => {
      const updatedSkills = [...skills];
      updatedSkills.splice(index, 1);
      setSkills(updatedSkills);
    };

    const handleEducationAdd = (school: string, degree: string, major: string, gpa: string, startDate: string, endDate: string) => {
        setEducation([...education, { school, degree, major, gpa, startDate, endDate }]);
        setEducationInput({ school: '', degree: '', major: '', gpa: '', startDate: '', endDate: '' });
      };
    
    const handleEducationRemove = (index: number) => {
      const updatedEducation = [...education];
      updatedEducation.splice(index, 1);
      setEducation(updatedEducation);
    };
    
    const handleExperienceAdd = () => {
      console.log('Adding experience...');
      if (
        experienceInput.position.trim() !== '' &&
        experienceInput.startDate.trim() !== '' &&
        experienceInput.endDate.trim() !== '' &&
        experienceInput.description.trim() !== ''
      ) {
        console.log('Start Date:', experienceInput.startDate); // Log start date
        console.log('End Date:', experienceInput.endDate); // Log end date
    
        setExperiences([...experiences, experienceInput]);
        setExperienceInput({
          position: '',
          company:'',
          startDate: '',
          endDate: '',
          description: '',
          aiAssistance: false
        });
      }
    };
    

    const handleExperienceRemove = (index: number) => {
      const updatedExperiences = [...experiences];
      updatedExperiences.splice(index, 1);
      setExperiences(updatedExperiences);
    };
    
 
    
  
    const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSummary(e.target.value);
    };

   // Helper function to convert Date to ISO 8601 string
    const toISOStringOrNull = (date: string | null): string | null => {
      return date ? new Date(date).toISOString() : null;
    };

    const handleSubmit = async () => {
      try {
        const requestBody = {
          userId,
          skills,
          education,
          experiences: experiences.map(exp => ({
            ...exp,
            startDate: toISOStringOrNull(experienceInput.startDate),
            endDate: toISOStringOrNull(experienceInput.endDate),
          })),
          summary
        };

        const response = await axios.post('/api/addResumeData', requestBody);

        if (response.status !== 200) {
          throw new Error('Failed to add resume data');
        }

        // Reset form state after successful submission
        setSkills([]);
        setEducation([]);
        setExperiences([]);
        setSummary('');
        setSummaryAiAssistance(false);
        setShowSummaryInput(false);

        // Optionally, redirect to another page after successful submission
        // window.location.href = '/success-page';
      } catch (error) {
        console.error('Error:', error);
        // Handle error
      }
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
            <div className="flex flex-wrap">
              {skills.map((skill, index) => (
              <div key={index} className="bg-blue-500 text-gray-700 px-3 py-1 rounded-full mr-2 mb-2 flex items-center">
              <span className="mr-2">{skill}</span>
              <button className="text-white" onClick={() => handleSkillRemove(index)}>x</button>
              </div>
              ))}
            </div>
        </div>
         {/* Experience  Column */}     
        <div className="w-full md:w-1/2 mb-8">
        <h2 className="text-lg font-semibold mb-4">Experiences</h2>
        <div className="mb-4">
        <input
            type="text" // Change input type to text
            placeholder="Company" // Add placeholder for company
            value={experienceInput.company} // Connect value to experienceInput.company
            onChange={(e) => setExperienceInput({ ...experienceInput, company: e.target.value })} // Update company value in experienceInput
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2" // Maintain styling
          />
          <input
            type="text"
            placeholder="Position"
            value={experienceInput.position}
            onChange={(e) => setExperienceInput({ ...experienceInput, position: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          />
          <div className="flex mb-2">
            <input
              type="date"
              placeholder="Start Date"
              value={experienceInput.startDate}
              onChange={(e) => setExperienceInput({ ...experienceInput, startDate: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 mr-2"
            />
            <input
              type="date"
              placeholder="End Date"
              value={experienceInput.endDate}
              onChange={(e) => setExperienceInput({ ...experienceInput, endDate: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2"
            />
          </div>
          <textarea
            placeholder="Description"
            value={experienceInput.description}
            onChange={(e) => setExperienceInput({ ...experienceInput, description: e.target.value })}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mb-2"
          />
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={experienceInput.aiAssistance}
              onChange={(e) => setExperienceInput({ ...experienceInput, aiAssistance: e.target.checked })}
              className="mr-2"
            />
            Use AI assistance
          </label>
          <button
            onClick={handleExperienceAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add Experience
          </button>
        </div>
        <ul>
          {experiences.map((experience, index) => (
            <li key={index}>
              <p>{experience.position}</p>
              <p>{experience.company}</p> {/* Display company */}
              <p>{experience.startDate} - {experience.endDate}</p>
              <p>{experience.description}</p>
              <p>AI Assistance: {experience.aiAssistance ? 'Yes' : 'No'}</p>
              <button onClick={() => handleExperienceRemove(index)} className="text-red-500">x</button>
            </li>
          ))}
        </ul>
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
                {item.school} - {item.degree} - {item.major} - {item.gpa} - {item.startDate} - {item.endDate}
                <button onClick={() => handleEducationRemove(index)} className="ml-2 text-red-500">x</button>
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
            onChange={(e) => setSummary(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 mb-2 w-full"
          />
          {/* Checkbox for AI assistance */}
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={summaryAiAssistance}
              onChange={(e) => setSummaryAiAssistance(e.target.checked)}
              className="form-checkbox h-4 w-4 text-blue-500"
            />
            <span className="ml-2">Use AI to improve summary</span>
          </label>
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
        {showSummaryInput && (
          <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-md absolute top-full left-1/2 transform -translate-x-1/2 opacity-90">
            Add a summary at the top of your resume. Its generally a good idea if you are more experienced in the industry.
          </span>
        )}
      </button>

      {/* Submit Button */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 block mx-auto"
      >
        Submit
      </button>
    </div>
  );
};
export default CreateResumePage;