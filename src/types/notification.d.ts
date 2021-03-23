export interface INotification {
	message: string;
	link?: { to: string; content: string };
	behavior?: "good" | "bad"; //Default "good"
	show?: boolean;
}
