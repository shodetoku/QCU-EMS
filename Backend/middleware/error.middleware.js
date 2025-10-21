const errorMiddleware = (err, req, res, next) => {

	try{
		let error = {...err}

		error.message = err.message

		console.error(err)

		//Mongoose bad Objectid
		if(err.name === 'CastError'){
			const message = 'Resource not found'

			error = new Error(message)
			error.statusCode = 404
		}

		//Mongoose duplicate key
		if(err.code === 11000){
			const message = 'Duplicate field value entered'

			error = new Error(message)
			error.statusCode = 400
		}

		//Mongoose validation error
		if(err.name === 'ValidationError'){
				//Now we did someting different here, we are mapping over the objects to check what error we have and show message for each one 
			const message = Object.value(err.errors).map(val => val.message)
			
			error = new Error(message.join(', '))
			error.statusCode = 400 
		}
		
		res.status(err.statusCode || 500).json({success: false, error: error.message || 'Server Error'})

		
	}catch(error){
		next(error)
	}

}

export default errorMiddleware