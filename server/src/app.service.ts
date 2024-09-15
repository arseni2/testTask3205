import {Injectable} from '@nestjs/common';
import {promises as fs} from 'fs';
import {usersData} from "./types";

@Injectable()
export class AppService {
	async searchUsers(email: string, number: string): Promise<usersData[]> {
		await new Promise(resolve => setTimeout(resolve, 5000));

		const data = await fs.readFile("./data.json", 'utf-8');
		const parsedData: usersData[] = JSON.parse(data);
        return parsedData.filter((user) => {
          return user.email.includes(email) || user.number.toString().includes(number);
        });
	}
}
