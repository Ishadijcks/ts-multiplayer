import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";
import {Test} from "../../common/Test";


createConnection().then(async connection => {
    let test = new Test();
    console.log(test.value)
    let userRepository = connection.getRepository(User);
    let user = await userRepository.findOne(3, {relations: ["wallet"]});
    console.log(user)
    console.log(user.wallet)
    setInterval(async () => {
        user.wallet.money++;
        console.log(user.wallet)
        await connection.manager.save(user);

    }, 1000)

}).catch(error => console.log(error));
