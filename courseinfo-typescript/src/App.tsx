interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
 description: string,
}

interface CoursePartBasic extends CoursePartWithDescription {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartWithDescription {
  backgroundMaterial: string;
  kind: "background"
}

interface CoursePartSpecial extends CoursePartWithDescription {
  requirements: string[];
  kind: "special"
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

const Header = ({ name }: { name: string }) => (
  <h1>{name}</h1>
)

interface ContentProps {
  courseParts: CoursePart[]
}

const Part = ({ part }: { part: CoursePart}) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled descriminated union member: ${JSON.stringify(value)}`
    );
  }
  switch(part.kind) {
    case "basic":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <br></br>
        </div>
      )
    case "group":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div>group projects {part.groupProjectCount}</div>
          <br></br>
        </div>
      )
    case "background":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>{part.backgroundMaterial}</div>
          <br></br>
        </div>
      )
    case "special":
      return (
        <div>
          <div><b>{part.name} {part.exerciseCount}</b></div>
          <div><i>{part.description}</i></div>
          <div>required skills: {part.requirements.join(', ')}</div>
          <br></br>
        </div>
      )
    default:
      return assertNever(part);
  }
}

const Content = (props: ContentProps) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <Part part={part} key={part.name} />
      ))}
    </div>
  )
}

const Total = ({ courseParts}: { courseParts: CoursePart[]}) => {
  return (
    <div>
      Number of exercises {courseParts.reduce((total, part) => total + part.exerciseCount, 0)}
    </div>
  )
}

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part",
    kind: "basic"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3,
    kind: "group",
  },
  {
    name: "Basics of type Narrowing",
    exerciseCount: 7,
    description: "How to go from unknown to string",
    kind: "basic"
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
    kind: "background"
  },
  {
    name: "Backend development",
    exerciseCount: 21,
    description: "Typing the backend",
    requirements: ["nodejs", "jest"],
    kind: "special"
  },
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