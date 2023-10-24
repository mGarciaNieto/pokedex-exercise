import { Ring } from '@uiball/loaders'
import './Loader.css'

const Loader = () => {
	return (
		<div className='loader'>
			<Ring size={90} lineWeight={5} speed={2} color='black' />
		</div>
	)
}

export default Loader
