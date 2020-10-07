export class Gateway{
	constructor(
		public serial: string,
		public name: string,
		public address: string
	){}
}

export class Device{
	constructor(
		public id: number,
		public uid: number,
		public vendor: string,
		public created_at: string,
		public status: boolean,
		public gateway: number,
	){}
}