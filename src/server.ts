import { AppDataSource } from "./data-source"
import { Url } from "./entity/Url"

AppDataSource.initialize().then(async () => {



}).catch(error => console.log(error))
