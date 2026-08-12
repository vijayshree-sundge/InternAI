export const generateMockData = () => {
    const departments = [{id:1, name:'Software Engineering'}, {id:2, name:'IoT Systems'}, {id:3, name:'Data Analytics'}, {id:4, name:'Healthcare Integration'}, {id:5, name:'QA & Compliance'}];
    const batches = [{id:1, name:'Summer 2026', start:'2026-06-01', end:'2026-08-31'}, {id:2, name:'Fall 2026', start:'2026-09-01', end:'2026-12-15'}];
    
    const users = [
        {id:1, name:'Admin HR', email:'admin@stridessoftware.com', role:'management'},
        {id:2, name:'Vikram Singh', email:'vikram@stridessoftware.com', role:'management'}
    ];
    
    for(let i=1; i<=5; i++) {
        users.push({ id: 2+i, name: `Mentor ${i}`, email: `mentor${i}@stridessoftware.com`, role: 'mentor', departmentId: i });
    }
    
    const internNames = ["Rahul Sharma", "Priya Deshmukh", "Aarav Patil", "Neha Kulkarni", "Aditya Joshi", "Sneha Iyer", "Rohan Mehta", "Ananya Rao", "Karan Kapoor", "Simran Kaur", "Arjun Nair", "Kavya Desai", "Ishaan Verma", "Diya Mishra", "Rishi Menon", "Riya Gupta", "Varun Thakur", "Zara Khan", "Aryan Das", "Mira Bose"];
    
    for(let i=1; i<=20; i++) {
        users.push({
            id: i+7, name: internNames[i-1], email: `intern${i}@stridessoftware.com`, role: 'intern',
            departmentId: (i%5)+1, batchId: (i%2)+1, mentorId: 3 + (i%5),
            attendance: Math.floor(Math.random()*15) + 85,
            performance: Math.floor(Math.random()*20) + 80,
            status: 'Active',
            college: 'College of Engineering, Pune',
            degree: 'B.E. Computer Science'
        });
    }

    const tasks = [];
    const statuses = ['Not Started', 'In Progress', 'Under Review', 'Completed', 'Overdue'];
    for(let i=1; i<=40; i++) {
        tasks.push({
            id: i, title: `Safetrans Integration Module ${i}`, description: `Complete the requirements for HealthTech module ${i}. Ensure all traceability and compliance objectives are met and documented.`,
            priority: ['High', 'Medium', 'Low'][i%3],
            deadline: new Date(Date.now() + (i-20)*86400000).toISOString(),
            status: statuses[i%5],
            internId: 8 + (i%20), mentorId: 3 + (i%5)
        });
    }
    
    const submissions = [];
    tasks.filter(t => t.status === 'Completed' || t.status === 'Under Review').forEach((t, idx) => {
        submissions.push({
            id: idx+1, taskId: t.id, internId: t.internId, content: `Here is my work for ${t.title}. I have attached the relevant API endpoints and tests.`,
            date: new Date(Date.now() - Math.random()*10000000).toISOString(),
            status: t.status === 'Completed' ? 'Approved' : 'Pending',
            aiScore: Math.floor(Math.random()*20) + 80,
            mentorScore: t.status === 'Completed' ? Math.floor(Math.random()*20) + 80 : null
        });
    });

    const logs = [{id:1, date:new Date().toISOString(), user:'System', action:'Initialized mock data'}];
    const notifications = [{id:1, userId:8, type:'System', message:'Welcome to InternAI!', read:false}];
    
    const attendance = [];
    // Just a few records for intern 1 (id: 8, Rahul Sharma)
    for(let i=0; i<10; i++) {
        attendance.push({id: i+1, internId: 8, date: new Date(Date.now() - i*86400000).toISOString(), status: i%8===0 ? 'Absent' : 'Present'});
    }

    const messages = [];

    return { users, departments, batches, tasks, submissions, logs, notifications, attendance, messages };
};
