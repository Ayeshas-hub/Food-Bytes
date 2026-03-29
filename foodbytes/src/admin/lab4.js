// =============================================
// STEP 1 — ARRAY OF OBJECTS (Menu Items)
// =============================================
let menuItems = [
    { id: 1, name: "Classic Smash Burger", category: "Burger", price: 850, rating: 4.9, delivery: 25, available: "Yes" },
    { id: 2, name: "Pepperoni Pizza", category: "Pizza", price: 1200, rating: 4.8, delivery: 30, available: "Yes" },
    { id: 3, name: "Grilled Chicken Wrap", category: "Wrap", price: 650, rating: 4.7, delivery: 20, available: "Yes" },
    { id: 4, name: "Chocolate Lava Cake", category: "Dessert", price: 450, rating: 5.0, delivery: 15, available: "Yes" },
    { id: 5, name: "BBQ Zinger Burger", category: "Burger", price: 950, rating: 4.6, delivery: 25, available: "No" },
    { id: 6, name: "Veggie Pizza", category: "Pizza", price: 1000, rating: 4.4, delivery: 30, available: "Yes" },
]

let nextId = 7

// =============================================
// STEP 1 — IF-ELSE LOGIC (5 conditions)
// =============================================
function runIfElse() {
    const output = document.getElementById('ifElseOutput')
    let results = []

    menuItems.forEach(item => {

        // Condition 1: Check price range
        let priceMsg = ''
        if (item.price >= 1000) {
            priceMsg = `${item.name} is a Premium item 💎`
        } else if (item.price >= 600) {
            priceMsg = `${item.name} is a Mid-range item 🟡`
        } else {
            priceMsg = `${item.name} is a Budget item 🟢`
        }

        // Condition 2: Check rating
        let ratingMsg = ''
        if (item.rating >= 4.9) {
            ratingMsg = 'Outstanding rating!'
        } else if (item.rating >= 4.7) {
            ratingMsg = 'Excellent rating!'
        } else if (item.rating >= 4.5) {
            ratingMsg = 'Good rating.'
        } else {
            ratingMsg = 'Average rating.'
        }

        // Condition 3: Check delivery time
        let deliveryMsg = ''
        if (item.delivery <= 15) {
            deliveryMsg = '⚡ Super Fast Delivery'
        } else if (item.delivery <= 25) {
            deliveryMsg = '🚀 Fast Delivery'
        } else {
            deliveryMsg = '🕐 Standard Delivery'
        }

        // Condition 4: Check availability
        let availMsg = ''
        if (item.available === 'Yes') {
            availMsg = '✅ Available Now'
        } else {
            availMsg = '❌ Currently Unavailable'
        }

        // Condition 5: Check if recommended
        let recommended = ''
        if (item.rating >= 4.7 && item.available === 'Yes') {
            recommended = '🌟 Highly Recommended!'
        } else if (item.rating >= 4.5 && item.available === 'Yes') {
            recommended = '👍 Worth Trying'
        } else {
            recommended = '⏳ Not Recommended Right Now'
        }

        results.push(`
            <div class="bg-orange-50 border border-orange-200 rounded p-3">
                <p class="font-semibold text-orange-700">${priceMsg}</p>
                <p class="text-gray-600 text-xs mt-1">${ratingMsg} | ${deliveryMsg}</p>
                <p class="text-gray-600 text-xs">${availMsg} | ${recommended}</p>
            </div>
        `)
    })

    output.innerHTML = results.join('')
}

// =============================================
// STEP 2 — FOR LOOP (Table)
// =============================================
function runForLoop() {
    const items = [
        { name: "Classic Smash Burger", price: 850 },
        { name: "Pepperoni Pizza", price: 1200 },
        { name: "Grilled Chicken Wrap", price: 650 },
        { name: "Chocolate Lava Cake", price: 450 },
        { name: "BBQ Zinger Burger", price: 950 },
    ]

    let rows = ''

    for (let i = 0; i < items.length; i++) {
        let status = ''
        if (items[i].price >= 1000) {
            status = '💎 Premium'
        } else if (items[i].price >= 600) {
            status = '🟡 Mid-Range'
        } else {
            status = '🟢 Budget'
        }

        let bg = ''
        if (i % 2 === 0) {
            bg = 'bg-white'
        } else {
            bg = 'bg-gray-50'
        }

        rows += `
            <tr class="border-b ${bg}">
                <td class="px-4 py-2">${i + 1}</td>
                <td class="px-4 py-2">${items[i].name}</td>
                <td class="px-4 py-2">Rs. ${items[i].price}</td>
                <td class="px-4 py-2">${status}</td>
            </tr>
        `
    }

    document.getElementById('forLoopBody').innerHTML = rows
}

// =============================================
// STEP 3 — WHILE LOOP
// =============================================
function runWhileLoop() {
    const output = document.getElementById('whileLoopOutput')
    let price = 200
    let items = []

    while (price <= 1200) {
        let color = ''
        if (price >= 1000) {
            color = 'bg-red-500'
        } else if (price >= 600) {
            color = 'bg-orange-500'
        } else {
            color = 'bg-green-500'
        }

        items.push(`<span class="${color} text-white px-3 py-1 rounded-full text-sm">Rs. ${price}</span>`)
        price += 200
    }

    output.innerHTML = items.join('')
}

// =============================================
// STEP 4 — LOOPS WITH CONDITIONS
// =============================================
function runLoopWithConditions() {
    const output = document.getElementById('loopConditionOutput')
    let budget = []
    let midRange = []
    let premium = []

    for (let i = 0; i < menuItems.length; i++) {
        if (menuItems[i].price < 600) {
            budget.push(menuItems[i].name)
        } else if (menuItems[i].price <= 900) {
            midRange.push(menuItems[i].name)
        } else {
            premium.push(menuItems[i].name)
        }
    }

    output.innerHTML = `
        <div class="bg-green-50 border border-green-200 rounded p-4">
            <h3 class="font-bold text-green-700 mb-2">🟢 Budget under Rs.600 (${budget.length})</h3>
            ${budget.map(n => `<p class="text-gray-600 text-sm">• ${n}</p>`).join('')}
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded p-4">
            <h3 class="font-bold text-orange-700 mb-2">🟡 Mid-Range Rs.600-900 (${midRange.length})</h3>
            ${midRange.map(n => `<p class="text-gray-600 text-sm">• ${n}</p>`).join('')}
        </div>
        <div class="bg-red-50 border border-red-200 rounded p-4">
            <h3 class="font-bold text-red-700 mb-2">💎 Premium Rs.900+ (${premium.length})</h3>
            ${premium.map(n => `<p class="text-gray-600 text-sm">• ${n}</p>`).join('')}
        </div>
    `
}

// =============================================
// RENDER CARDS (Array.map)
// =============================================
function renderCards(data) {
    const grid = document.getElementById('cardsGrid')
    const noResults = document.getElementById('noResults')

    if (data.length === 0) {
        grid.innerHTML = ''
        noResults.classList.remove('hidden')
        return
    }

    noResults.classList.add('hidden')

    grid.innerHTML = data.map(item => {
        let categoryBadge = ''
        if (item.category === 'Burger') {
            categoryBadge = 'bg-orange-200 text-orange-800'
        } else if (item.category === 'Pizza') {
            categoryBadge = 'bg-red-200 text-red-800'
        } else if (item.category === 'Wrap') {
            categoryBadge = 'bg-yellow-200 text-yellow-800'
        } else {
            categoryBadge = 'bg-purple-200 text-purple-800'
        }

        let priceColor = ''
        if (item.price >= 1000) {
            priceColor = 'text-red-600'
        } else if (item.price >= 600) {
            priceColor = 'text-orange-600'
        } else {
            priceColor = 'text-green-600'
        }

        let availBadge = item.available === 'Yes'
            ? '<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">✅ Available</span>'
            : '<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">❌ Unavailable</span>'

        return `
            <div class="bg-white rounded-lg shadow p-6 border border-gray-100 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-3">
                    <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl">
                        🍽️
                    </div>
                    <span class="${categoryBadge} px-2 py-1 rounded-full text-xs font-medium">${item.category}</span>
                </div>
                <h3 class="font-bold text-gray-800 text-lg">${item.name}</h3>
                <p class="${priceColor} font-bold text-lg mt-1">Rs. ${item.price}</p>
                <p class="text-gray-500 text-sm">⭐ Rating: ${item.rating}</p>
                <p class="text-gray-500 text-sm">🚚 Delivery: ${item.delivery} mins</p>
                <div class="mt-2">${availBadge}</div>
                <div class="flex gap-2 mt-4">
                    <button onclick="openEdit(${item.id})"
                        class="bg-orange-500 text-white px-3 py-1 rounded text-sm hover:bg-orange-600 flex-1">
                        ✏️ Edit
                    </button>
                    <button onclick="deleteItem(${item.id})"
                        class="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 flex-1">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `
    }).join('')
}

// =============================================
// ADD ITEM (Array.push)
// =============================================
function addItem() {
    const name = document.getElementById('inputName').value.trim()
    const category = document.getElementById('inputCategory').value.trim()
    const price = parseInt(document.getElementById('inputPrice').value)
    const rating = parseFloat(document.getElementById('inputRating').value)
    const delivery = parseInt(document.getElementById('inputDelivery').value) || 30
    const available = document.getElementById('inputAvailable').value

    document.getElementById('addError').classList.add('hidden')
    document.getElementById('addSuccess').classList.add('hidden')

    if (!name || !category || !price) {
        document.getElementById('addError').classList.remove('hidden')
        return
    }

    menuItems.push({ id: nextId++, name, category, price, rating, delivery, available })

    document.getElementById('inputName').value = ''
    document.getElementById('inputCategory').value = ''
    document.getElementById('inputPrice').value = ''
    document.getElementById('inputDelivery').value = ''

    document.getElementById('addSuccess').classList.remove('hidden')
    applyFilters()
    runIfElse()
    runLoopWithConditions()
}

// =============================================
// DELETE ITEM (Array.filter)
// =============================================
function deleteItem(id) {
    if (confirm('Are you sure you want to delete this item?')) {
        menuItems = menuItems.filter(item => item.id !== id)
        applyFilters()
        runIfElse()
        runLoopWithConditions()
    }
}

// =============================================
// EDIT ITEM
// =============================================
function openEdit(id) {
    const item = menuItems.find(item => item.id === id)
    document.getElementById('editId').value = item.id
    document.getElementById('editName').value = item.name
    document.getElementById('editCategory').value = item.category
    document.getElementById('editPrice').value = item.price
    document.getElementById('editRating').value = item.rating
    document.getElementById('editDelivery').value = item.delivery
    document.getElementById('editAvailable').value = item.available
    document.getElementById('editModal').classList.remove('hidden')
}

function updateItem() {
    const id = parseInt(document.getElementById('editId').value)
    menuItems = menuItems.map(item => {
        if (item.id === id) {
            return {
                ...item,
                name: document.getElementById('editName').value,
                category: document.getElementById('editCategory').value,
                price: parseInt(document.getElementById('editPrice').value),
                rating: parseFloat(document.getElementById('editRating').value),
                delivery: parseInt(document.getElementById('editDelivery').value),
                available: document.getElementById('editAvailable').value,
            }
        }
        return item
    })
    closeModal()
    applyFilters()
    runIfElse()
    runLoopWithConditions()
}

function closeModal() {
    document.getElementById('editModal').classList.add('hidden')
}

// =============================================
// SEARCH & FILTERS (5 filters)
// =============================================
function applyFilters() {
    const name = document.getElementById('searchName').value.toLowerCase()
    const category = document.getElementById('filterCategory').value
    const price = document.getElementById('filterPrice').value
    const rating = document.getElementById('filterRating').value
    const available = document.getElementById('filterAvailable').value

    let filtered = menuItems.filter(item => {
        // Filter 1: Name search
        if (name && !item.name.toLowerCase().includes(name)) return false
        // Filter 2: Category
        if (category && item.category !== category) return false
        // Filter 3: Price range
        if (price === 'budget' && item.price >= 500) return false
        if (price === 'mid' && (item.price < 500 || item.price > 900)) return false
        if (price === 'premium' && item.price <= 900) return false
        // Filter 4: Rating
        if (rating === 'top' && item.rating < 4.8) return false
        if (rating === 'good' && (item.rating < 4.5 || item.rating >= 4.8)) return false
        if (rating === 'average' && item.rating >= 4.5) return false
        // Filter 5: Availability
        if (available && item.available !== available) return false
        return true
    })

    renderCards(filtered)
}

function resetFilters() {
    document.getElementById('searchName').value = ''
    document.getElementById('filterCategory').value = ''
    document.getElementById('filterPrice').value = ''
    document.getElementById('filterRating').value = ''
    document.getElementById('filterAvailable').value = ''
    renderCards(menuItems)
}

// =============================================
// INIT — Run on page load
// =============================================
runIfElse()
runForLoop()
runWhileLoop()
runLoopWithConditions()
renderCards(menuItems) 