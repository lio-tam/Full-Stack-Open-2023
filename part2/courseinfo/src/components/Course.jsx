const Header = ({ course }) => {
    return (
        <h2>{course}</h2>
    )
}

const Content = ({ parts }) => {
    return (
        <>
            {parts.map(part => 
                <Part key={part.id} part={part} />
            )}
        </>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Total = ({ total }) => <p><b>total of {total} exercises</b></p>

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total 
            total= {
                course.parts.reduce((sum, part) => sum + part.exercises, 0)
            } 
        />
        </div>
    )
}

export default Course