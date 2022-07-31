import ShoesIndex from './shoes/ShoeIndex'

const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	const { msgAlert } = props

	return (
		<>
			<h2>My Shoes</h2>
			<ShoesIndex msgAlert={ msgAlert }/>
		</>
	)
}

export default Home
