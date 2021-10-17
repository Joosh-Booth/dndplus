
import { HorizontalFlexContainer } from '@components/containers'


const ExpandingButton = ({ icon, child, style, onClick = () => null, maxWidth }) => {
  return (
    <div style={{ position: 'relative', minWidth: '2vw', }}>
      <HorizontalFlexContainer css={{
        borderRadius: 10,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        maxWidth: '2vw',
        height: '2vw',
        cursor: 'pointer',
        ':hover': {
          maxWidth: maxWidth ?? '100%',
        },
        transition: 'max-width 250ms, margin 250ms ease-in',
        ...style
      }}
        onClick={onClick}
      >
        <div style={{ minWidth: '2vw', maxWidth: '2vw', padding: 5, display: 'flex' }}>
          {icon}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', padding: 10 }}>
          {child}
        </div>
      </HorizontalFlexContainer>
    </div>
  )
}

export default ExpandingButton