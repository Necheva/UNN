import React from 'react';
import { observer } from 'mobx-react';

import Card from '@src/components/common/Card/Card';
import styles from '@src/components/UserData/Users/Users.scss';
import UserData from '@src/components/UserData/Users/Data/UserData';

@observer
class Users extends React.Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.top}>
                    <Card className={styles.userDataInput}>
                        <UserData/>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Users;
