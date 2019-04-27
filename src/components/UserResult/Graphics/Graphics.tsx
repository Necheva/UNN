import React from 'react';
import { observer } from 'mobx-react';

import Card from '@src/components/common/Card/Card';
import styles from '@src/components/UserResult/Graphics/Graphics.scss';
import UserGraphics from '@src/components/UserResult/Graphics/UserGraphics/UserGraphics';
import UserMap from '@src/components/UserResult/Graphics/UserMap/UserMap';

@observer
class Users extends React.Component {
    render() {
        return(
            <div className={styles.container}>
                <div className={styles.top}>
                    <Card className={styles.userDataOutput}>
                        <UserGraphics/>
                    </Card>
                    <Card className={styles.shopMap}>
                        <UserMap/>
                    </Card>
                </div>
            </div>
        );
    }
}

export default Users;

