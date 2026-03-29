// =============================================
// HOME PAGE JS - FoodBytes
// CRUD + Array Methods + String Methods
// =============================================

// Copy database to working array
let items = [...menuData]
let nextId = 9

// =============================================
// STRING METHODS (10 methods used throughout)
// =============================================

// 1. toUpperCase() - format category display
const formatCategory = (cat) => cat.toUpperCase()

// 2. toLowerCase() - for search comparison
const toLowerSearch = (str) => str.toLowerCase()

// 3. trim() - clean input data
const cleanInput = (str) => str.trim()

// 4. includes() - search functionality
const searchIncludes = (str, query) => str.toLowerCase().includes(query.toLowerCase())

// 5. replace() - format price display
const formatPrice = (price) => `Rs. ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`

// 6. slice() - truncate description
const truncateDesc = (str, len = 50) => str.length > len ? str.slice(0, len) + '...' : str

// 7. split() - parse date
const formatDate = (dateStr) => {
    const parts = dateStr.split('-')
    return `${parts[2]}-${parts[1]}-${parts[0]}`
}

// 8. startsWith() - category filter
const startsWithCategory = (name, cat) => name.startsWith(cat)

// 9. padStart() - format ID display
const formatId = (id) => id.toString().padStart(3, '0')

// 10. charAt() - get first letter for avatar
const getInitial = (name) => name.charAt(0).toUpperCase()

// =============================================
// OBJECT CRUD METHODS (Task 5)
// =============================================

// Add property to object
const addProperty = (obj, key, value) => {
    obj[key] = value
    return obj
}

// Delete property from object
const removeProperty = (obj, key) => {
    const newObj = { ...obj }
    delete newObj[key]
    return newObj
}

// Check if property exists
const hasProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key)

// Get all keys
const getKeys = (obj) => Object.keys(obj)

// Get all values
const getValues = (obj) => Object.values(obj)

// =============================================
// ARRAY METHODS
// =============================================

// arr.filter() - filter items
const filterItems = (arr, fn) => arr.filter(fn)

// arr.map() - transform items
const mapItems = (arr, fn) => arr.map(fn)

// arr.sort() - sort items
const sortItems = (arr, fn) => [...arr].sort(fn)

// arr.reduce() - get total value
const getTotalValue = (arr) => arr.reduce((acc, item) => acc + item.price, 0)

// arr.find() - find single item
const findItem = (arr, id) => arr.find(item => item.id === id)

// arr.includes() - check category exists
const categoryExists = (arr, cat) => arr.map(i => i.category).includes(cat)

// arr.every() - check all available
const allAvailable = (arr) => arr.every(item => item.available)

// arr.some() - check any top rated
const hasTopRated = (arr) => arr.some(item => item.rating >= 4.9)

// =============================================
// RENDER CARDS
// =============================================
const renderCards = (data) => {
    const grid = document.getElementById('cardsGrid')
    const noResults = document.getElementById('noResults')
    const totalEl = document.getElementById('totalItems')
    const totalValueEl = document.getElementById('totalValue')

    if (!grid) return

    // Update stats
    if (totalEl) totalEl.textContent = data.length
    if (totalValueEl) totalValueEl.textContent = formatPrice(getTotalValue(data))

    if (data.length === 0) {
        grid.innerHTML = ''
        if (noResults) noResults.classList.remove('hidden')
        return
    }

    if (noResults) noResults.classList.add('hidden')

    grid.innerHTML = mapItems(data, item => {
        // Use string methods
        const categoryDisplay = formatCategory(item.category)
        const priceDisplay = formatPrice(item.price)
        const descDisplay = truncateDesc(item.description)
        const idDisplay = formatId(item.id)
        const initial = getInitial(item.name)
        const dateDisplay = formatDate(item.addedDate)

        let categoryBadge = ''
        if (item.category === 'Burger') categoryBadge = 'bg-orange-200 text-orange-800'
        else if (item.category === 'Pizza') categoryBadge = 'bg-red-200 text-red-800'
        else if (item.category === 'Wrap') categoryBadge = 'bg-yellow-200 text-yellow-800'
        else if (item.category === 'Dessert') categoryBadge = 'bg-purple-200 text-purple-800'
        else if (item.category === 'Drinks') categoryBadge = 'bg-blue-200 text-blue-800'
        else categoryBadge = 'bg-gray-200 text-gray-800'

        let priceColor = item.price >= 1000 ? 'text-red-600' : item.price >= 600 ? 'text-orange-600' : 'text-green-600'
        let availBadge = item.available
            ? '<span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">✅ Available</span>'
            : '<span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs">❌ Unavailable</span>'

        return `
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-100 hover:shadow-md transition">
                <div class="flex justify-between items-start mb-3">
                    <div class="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                        ${initial}
                    </div>
                    <span class="${categoryBadge} px-2 py-1 rounded-full text-xs font-medium">${categoryDisplay}</span>
                </div>
                <p class="text-gray-400 text-xs">#${idDisplay}</p>
                <h3 class="font-bold text-gray-800 dark:text-white text-lg">${item.name}</h3>
                <p class="text-gray-500 dark:text-gray-300 text-sm mt-1">${descDisplay}</p>
                <p class="${priceColor} font-bold text-lg mt-2">${priceDisplay}</p>
                <p class="text-gray-500 dark:text-gray-300 text-sm">⭐ ${item.rating} | 🚚 ${item.delivery} mins</p>
                <p class="text-gray-400 text-xs">Added: ${dateDisplay}</p>
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
const addItem = () => {
    const name = cleanInput(document.getElementById('inputName').value)
    const category = cleanInput(document.getElementById('inputCategory').value)
    const price = parseInt(document.getElementById('inputPrice').value)
    const rating = parseFloat(document.getElementById('inputRating').value)
    const delivery = parseInt(document.getElementById('inputDelivery').value) || 30
    const available = document.getElementById('inputAvailable').value === 'true'
    const description = cleanInput(document.getElementById('inputDescription').value) || 'Delicious item from FoodBytes'

    document.getElementById('addError').classList.add('hidden')
    document.getElementById('addSuccess').classList.add('hidden')

    if (!name || !category || !price) {
        document.getElementById('addError').classList.remove('hidden')
        return
    }

    const newItem = {
        id: nextId++,
        name,
        category,
        price,
        rating,
        delivery,
        available,
        description,
        addedDate: new Date().toISOString().split('T')[0]
    }

    items.push(newItem)

    // Clear form
    document.getElementById('inputName').value = ''
    document.getElementById('inputCategory').value = ''
    document.getElementById('inputPrice').value = ''
    document.getElementById('inputDelivery').value = ''
    document.getElementById('inputDescription').value = ''

    document.getElementById('addSuccess').classList.remove('hidden')
    applyFilters()
}

// =============================================
// DELETE ITEM (Array.filter)
// =============================================
const deleteItem = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
        items = filterItems(items, item => item.id !== id)
        applyFilters()
    }
}

// =============================================
// EDIT ITEM
// =============================================
const openEdit = (id) => {
    const item = findItem(items, id)
    if (!item) return

    document.getElementById('editId').value = item.id
    document.getElementById('editName').value = item.name
    document.getElementById('editCategory').value = item.category
    document.getElementById('editPrice').value = item.price
    document.getElementById('editRating').value = item.rating
    document.getElementById('editDelivery').value = item.delivery
    document.getElementById('editAvailable').value = item.available
    document.getElementById('editDescription').value = item.description
    document.getElementById('editModal').classList.remove('hidden')
}

const updateItem = () => {
    const id = parseInt(document.getElementById('editId').value)
    items = mapItems(items, item => {
        if (item.id === id) {
            return {
                ...item,
                name: cleanInput(document.getElementById('editName').value),
                category: cleanInput(document.getElementById('editCategory').value),
                price: parseInt(document.getElementById('editPrice').value),
                rating: parseFloat(document.getElementById('editRating').value),
                delivery: parseInt(document.getElementById('editDelivery').value),
                available: document.getElementById('editAvailable').value === 'true',
                description: cleanInput(document.getElementById('editDescription').value),
            }
        }
        return item
    })
    closeModal()
    applyFilters()
}

const closeModal = () => {
    document.getElementById('editModal').classList.add('hidden')
}

// =============================================
// SEARCH & FILTER (5+ filters + array methods)
// =============================================
const applyFilters = () => {
    const searchQuery = toLowerSearch(document.getElementById('searchName')?.value || '')
    const category = document.getElementById('filterCategory')?.value || ''
    const priceRange = document.getElementById('filterPrice')?.value || ''
    const ratingFilter = document.getElementById('filterRating')?.value || ''
    const availFilter = document.getElementById('filterAvailable')?.value || ''
    const sortBy = document.getElementById('sortBy')?.value || ''

    // Filter 1: Search by name (uses includes + toLowerCase)
    // Filter 2: Category filter
    // Filter 3: Price range
    // Filter 4: Rating filter
    // Filter 5: Availability filter
    let filtered = filterItems(items, item => {
        if (searchQuery && !searchIncludes(item.name, searchQuery) && !searchIncludes(item.category, searchQuery)) return false
        if (category && item.category !== category) return false
        if (priceRange === 'budget' && item.price >= 500) return false
        if (priceRange === 'mid' && (item.price < 500 || item.price > 900)) return false
        if (priceRange === 'premium' && item.price <= 900) return false
        if (ratingFilter === 'top' && item.rating < 4.8) return false
        if (ratingFilter === 'good' && (item.rating < 4.5 || item.rating >= 4.8)) return false
        if (ratingFilter === 'average' && item.rating >= 4.5) return false
        if (availFilter === 'true' && !item.available) return false
        if (availFilter === 'false' && item.available) return false
        return true
    })

    // Sort (arr.sort())
    if (sortBy === 'price-asc') filtered = sortItems(filtered, (a, b) => a.price - b.price)
    else if (sortBy === 'price-desc') filtered = sortItems(filtered, (a, b) => b.price - a.price)
    else if (sortBy === 'rating') filtered = sortItems(filtered, (a, b) => b.rating - a.rating)
    else if (sortBy === 'date') filtered = sortItems(filtered, (a, b) => new Date(b.addedDate) - new Date(a.addedDate))

    renderCards(filtered)

    // Update array method results
    updateArrayMethodResults(filtered)
}

const resetFilters = () => {
    document.getElementById('searchName').value = ''
    document.getElementById('filterCategory').value = ''
    document.getElementById('filterPrice').value = ''
    document.getElementById('filterRating').value = ''
    document.getElementById('filterAvailable').value = ''
    document.getElementById('sortBy').value = ''
    renderCards(items)
    updateArrayMethodResults(items)
}

// =============================================
// ARRAY METHOD RESULTS DISPLAY
// =============================================
const updateArrayMethodResults = (data) => {
    const el = document.getElementById('arrayMethodResults')
    if (!el) return

    const total = getTotalValue(data)
    const topRated = hasTopRated(data)
    const allAvail = allAvailable(data)
    const burgerExists = categoryExists(data, 'Burger')

    el.innerHTML = `
        <div class="bg-orange-50 dark:bg-gray-700 rounded p-3 text-sm">
            <p class="font-semibold text-orange-700 dark:text-orange-300">📊 Array Method Results:</p>
            <p class="text-gray-600 dark:text-gray-300">🔢 reduce() — Total Menu Value: <strong>${formatPrice(total)}</strong></p>
            <p class="text-gray-600 dark:text-gray-300">⭐ some() — Has Top Rated (4.9+): <strong>${topRated ? 'Yes' : 'No'}</strong></p>
            <p class="text-gray-600 dark:text-gray-300">✅ every() — All Available: <strong>${allAvail ? 'Yes' : 'No'}</strong></p>
            <p class="text-gray-600 dark:text-gray-300">🍔 includes() — Has Burgers: <strong>${burgerExists ? 'Yes' : 'No'}</strong></p>
        </div>
    `
}

// =============================================
// INIT
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme()
    renderCards(items)
    updateArrayMethodResults(items)
})