import React from 'react'
import { useParams } from 'react-router-dom'
import Box from '@material-ui/core/Box'

const Test = (props, context) => {
	let { testId } = useParams()

	return (
		<Box my={14}>
			<h1>{`ID: ${testId}`}</h1>
		</Box>
	)
}

export default Test