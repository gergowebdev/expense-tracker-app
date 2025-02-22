import { useContext, useLayoutEffect } from "react";
import { View, StyleSheet } from "react-native";

import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import { storeExpense } from "../util/http";

function ManageExpense({ route, navigation }) {
    const expensesCtx = useContext(ExpensesContext);

    const editedExpensedId = route.params?.expenseId;
    const isEditing = !!editedExpensedId;

    // we get the id we are editing (editedExpensedId), we can use this id to
    // fetch all the data we need, so the entire Expense, and than we can pass the data into
    // the ExpenseForm, to set that data as an initial state for our form state
    const selectedExpense = expensesCtx.expenses.find(
        (expense) => expense.id === editedExpensedId
    );

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? "Edit Expense" : "Add Expense",
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        navigation.goBack();
        expensesCtx.deleteExpense(editedExpensedId);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing) {
            expensesCtx.updateExpense(editedExpensedId, expenseData);
        } else {
            storeExpense(expenseData);
            expensesCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                submitButtonLabel={isEditing ? "Update" : "Add"}
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedExpense}
            />

            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: "center",
    },
});
