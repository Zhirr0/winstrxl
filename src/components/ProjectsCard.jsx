const imageMap = {
  1: '',
  2: '',
  3: '',
}

const positionMap = {
  1: 'center center',
  2: 'center top',
  3: 'center center',
}

const ProjectsCard = ({index}) => {
  return (
    <div className={`projects-card projects-card-${index}`} style={{ overflow: 'hidden', position: 'relative' }}>
      <img 
        src={imageMap[index]}
        alt={`Project ${index}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: positionMap[index],
        }}
      />
    </div>
  )
}

export default ProjectsCard