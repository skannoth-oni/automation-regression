import { pageFixture } from "../../../utility/pagefixture";


export default class HomePage {

    public customerLogin() {
        return pageFixture.page.getByText("Customer Login");
    }

    public managerLogin() {
        return pageFixture.page.getByText("Bank Manager Login");
    }

    public submitButton() {
        return pageFixture.page.getByText('submit');
    }

    public email(){
        return pageFixture.page.getByPlaceholder("email");
    }

    public password(){
        return pageFixture.page.getByPlaceholder("password");
    }



}