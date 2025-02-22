import { useContext, useEffect } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";

function RecentExpenses() {
    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        //getExpenses is a helper function for async await
        async function getExpenses() {
            const expenses = await fetchExpenses();
            expensesCtx.setExpenses(expenses);
        }

        getExpenses();
    }, []);

    const RecentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    });

    return (
        <ExpensesOutput
            expenses={RecentExpenses}
            expensesPeriod="Last 7 Days"
            fallbackText="No expenses registered for the last 7 days"
        />
    );
}

export default RecentExpenses;
