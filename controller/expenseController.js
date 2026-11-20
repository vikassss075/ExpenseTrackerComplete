const Expense = require('../models/expense');
const addExpense = async (req, res)=>{
    const {amount, description, category} = req.body;
    try{
        const expense = await Expense.create({
            amount: amount,
            description: description,
            category: category
        });

        res.status(201).json({
            expense,
            message: "expense created"
        })
    }catch(error){
        console.log("unable to create expense");
        res.status(500).json({
            message:" unable to add",
            error: error.message
        })
    };
};

const getExpenses = async(req, res)=>{
    try{
        const expenses = await Expense.findAll();
        res.status(200).json({
            expenses,
            message: "expenses found"
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
};

const getExpenseById = async(req, res)=>{
    try{
        const {id} = req.params;
        const expense = await Expense.findByPk(id);
        res.status(200).json({
            expense,
            message: "expense found"
        })
    }catch(error){
        res.status(404).json({
            message: error.message
        })
    }
};

const editExpense = async(req, res)=>{
    try{
        const {id} = req.params;
        const {amount, description, category} = req.body;

        const expense = await Expense.findByPk(id);

        await expense.update({
            amount,
            description,
            category
        });
        res.status(201).json({
            expense,
            message: "expense updated"
        })
    }catch(error){
        res.status(500).json({
            message:error.message
        })
    }
};

const deleteExpense = async(req, res)=>{
    try{
        const {id} = req.params;
        const expense = await Expense.findByPk(id);
        await expense.destroy();
        res.status(200).json({
            expense,
            message: "expense deleted"
        })
    }catch(error){
        res.status(500).json({
            error: error.message
        })
    }
}


module.exports ={
    addExpense,
    getExpenses,
    getExpenseById,
    editExpense,
    deleteExpense
}