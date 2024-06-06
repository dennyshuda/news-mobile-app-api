import jwt from "jsonwebtoken";

export const signJWT = (payload: Object, options?: jwt.SignOptions) => {
	return jwt.sign(payload, process.env.JWT_SECRET_KEY!, { ...options });
};

export const verifyJWT = (token: string) => {
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!);
		return {
			valid: true,
			expired: false,
			decoded,
		};
	} catch (error) {
		return {
			valid: false,
			expired: error,
			decoded: null,
		};
	}
};
