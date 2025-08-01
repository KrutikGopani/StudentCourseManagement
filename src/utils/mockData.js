export const mockAPI = {

    students: [
        { id: 1, name: 'John Doe', email: 'john@example.com', courses: [{ id: 1, title: 'React Fundamentals' }, { id: 2, title: 'JavaScript Advanced' }] },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', courses: [{ id: 1, title: 'React Fundamentals' }] },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', courses: [] },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', courses: [{ id: 2, title: 'JavaScript Advanced' }, { id: 3, title: 'Node.js Backend' }] },
        { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', courses: [{ id: 3, title: 'Node.js Backend' }] },
        { id: 6, name: 'Diana Prince', email: 'diana@example.com', courses: [{ id: 1, title: 'React Fundamentals' }, { id: 3, title: 'Node.js Backend' }] },
        { id: 7, name: 'Eve Davis', email: 'eve@example.com', courses: [] },
        { id: 8, name: 'Frank Miller', email: 'frank@example.com', courses: [{ id: 2, title: 'JavaScript Advanced' }] },
    ],
    courses: [
        { id: 1, title: 'React Fundamentals', description: 'Learn the basics of React', students: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Jane Smith' }, { id: 6, name: 'Diana Prince' }] },
        { id: 2, title: 'JavaScript Advanced', description: 'Advanced JavaScript concepts', students: [{ id: 1, name: 'John Doe' }, { id: 4, name: 'Alice Brown' }, { id: 8, name: 'Frank Miller' }] },
        { id: 3, title: 'Node.js Backend', description: 'Backend development with Node.js', students: [{ id: 4, name: 'Alice Brown' }, { id: 5, name: 'Charlie Wilson' }, { id: 6, name: 'Diana Prince' }] },
        { id: 4, title: 'Python for Data Science', description: 'Data analysis with Python', students: [] },
        { id: 5, title: 'Machine Learning Basics', description: 'Introduction to ML', students: [] },
    ]
}