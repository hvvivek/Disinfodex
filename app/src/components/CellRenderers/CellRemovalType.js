import LinesEllipsis from 'react-lines-ellipsis'

function CellRemovalType(props)
{
    return <LinesEllipsis
                text={props.value && props.value.toString()}
                maxLine='2'
                ellipsis='...'
                trimRight
                basedOn='letters'
            />
}

export default CellRemovalType