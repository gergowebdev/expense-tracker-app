import { useLayoutEffect } from "react";
import { Text } from "react-native";

function ManageExpense({ route, navigation }) {
    const editedExpensedId = route.params?.expenseId;
    const isEditing = !!editedExpensedId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    return <Text>ManageExpense Screen</Text>;
}

export default ManageExpense;
