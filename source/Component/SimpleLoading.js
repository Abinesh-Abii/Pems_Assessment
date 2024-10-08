import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';

const SimpleLoading = ({ visible }) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={visible}
            statusBarTranslucent={true}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)'
            }}>
                <ActivityIndicator size="large" color="#68B24C" />
            </View>
        </Modal>
    );
};

export default SimpleLoading;
