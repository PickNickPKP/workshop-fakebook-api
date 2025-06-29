export default (func) => {
	return function (req, res, next) {
		try {
			const result = func(req, res, next)
			if(result && typeof result.then === 'function') {
				result.catch(next)
			}
		}catch(err) {
			next(err)
		}
	}
}

//let p3 =  new promise( (rs ,rj)=> rs(99))
// typeof p3.then = 'function'

//step 1:
// return function (req, res, next) {
// เป็นฟังก์ชันที่รับฟังก์ชัน func เป็นพารามิเตอร์

// step 2:
 //check มี promise หรือไม่
// if(result && typeof result.then === 'function') 