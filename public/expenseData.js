axios.defaults.baseURL = "http://localhost:3000";

let editExpenseId = null;
async function formHandler(e){
    e.preventDefault();
    const amount = e.target.amount.value;
    const description = e.target.desc.value;
    const category = e.target.category.value;

    formData ={
        amount: amount,
        description: description,
        category: category
    }

    try{
        if(editExpenseId){
            await axios.put(`/expenses/${editExpenseId}`, formData);
            console.log('expense updated');
            editExpenseId = null;
            location.reload();
        }else{
            const response = await axios.post('/expenses', formData);
            console.log("Expense Created");
            const expense = response.data.expense;
            showData(expense);
            e.target.reset();
        }
        
    }catch(error){
        console.log("unable to create expense");
    }
};

async function showData(expense){
    const id = expense.id;
    const amount = expense.amount;
    const desc = expense.description;
    const category = expense.category;
    
        const li = `
        <li id="expense-${id}" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
                <span class="fw-bold">₹${amount}</span>
                <span class="mx-2">${desc}</span>
                <span class="badge bg-secondary text-capitalize">${category}</span>
            </div>
            <div class="d-flex gap-2">
                <button class="btn btn-sm btn-outline-primary" onclick="editExpense(${id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteExpense(${id})">Delete</button>
            </div>
        </li>
    `;
    const parent = document.getElementById('expenseList');
    if(!parent){
        return;
    }

    parent.innerHTML+= li;
}

window.addEventListener('DOMContentLoaded', async()=>{
    try{
        const expenses = await axios.get('/expenses');
        expenses.data.expenses.forEach((expense)=>{
            showData(expense);
        })
    }
    catch(error){
        console.log(error);
    }
});

async function editExpense(id){
    try{
        const response = await axios.get(`/expenses/${id}`);
        const expense = response.data.expense;
    document.getElementById('amount').value = expense.amount;
    document.getElementById('desc').value = expense.description;
    document.getElementById('category').value = expense.category;

    editExpenseId = id;
    }
    catch(error){
        console.log(error);
    }
}

async function deleteExpense(id) {
    try{
        await axios.delete(`/expenses/${id}`);
        document.getElementById(`expense-${id}`)?.remove();
        console.log('expense deleted');
    }catch(error){
        console.log(error);
    }
    
}