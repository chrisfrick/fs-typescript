interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps) => (
  <h1>{props.name}</h1>
)

interface Course {
  name: string,
  exerciseCount: number,
}

interface CourseParts {
  courseParts: Course[]
}

const Content = (props: CourseParts) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  )
}

const Total = (props: CourseParts) => {
  return (
    <div>
      Number of exercises {props.courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />

      <Content courseParts={courseParts} />

      <Total courseParts={courseParts} />
      
    </div>
  );
};

export default App;