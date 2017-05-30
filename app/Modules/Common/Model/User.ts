import * as Iridium from 'iridium';

export interface UserDocument {
    _id?: string;
    username: string;
    mail: string;
    password: string;
}

@Iridium.Collection("users")
@Iridium.Index({ email: 1 }, { unique: true })
export class User extends Iridium.Instance<UserDocument, User> implements UserDocument {
    @Iridium.ObjectID
    _id: string;

    @Iridium.Property(String)
    username: string;

    @Iridium.Property(String)
    mail: string;

    @Iridium.Property(String)
    password: string;
}