const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Part = (props) => {
  console.log("Parts props are", props)
  return (
    <div>
      <p>{props.parts.name} {props.parts.exercises}</p>
    </div>
  )
}

const Content = (props) => {
  console.log("Content props are", props)
  const allParts = props.parts.map(n => { return <Part key={n.id} parts={n}/> })

  return (
    <div>
      {allParts}
    </div>
  )
}

const Total = (props) => {
  const exerciseAmount = props.parts.reduce((sum, order) => sum + order.exercises, 0)
  return (
    <div>
      <p>total of {exerciseAmount} exercises</p>
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts}/>
    </div>
  )
}

export default Course