import { useState } from 'react';
import Item from './Item';

export default function PackagingList({
	items,
	onDeleteItems,
	onToggleItem,
	setItems,
}) {
	const [sortBy, setSortBy] = useState('input');

	let sortedItems;

	if (sortBy === 'input') sortedItems = items;
	if (sortBy === 'description')
		sortedItems = items
			.slice()
			.sort((a, b) => a.description.localeCompare(b.description));

	if (sortBy === 'packed')
		sortedItems = items
			.slice()
			.sort((a, b) => Number(a.packed) - Number(b.packed));

	function handleClearItems() {
		setItems([]);
	}

	return (
		<div className="list">
			<ul>
				{sortedItems.map((item) => (
					<Item
						item={item}
						key={item.id}
						onDeleteItems={onDeleteItems}
						onToggleItem={onToggleItem}
					/>
				))}
			</ul>
			<div className="actions">
				<select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
					<option value="input">Sort by Input Order</option>
					<option value="description">Sort by Description</option>
					<option value="packed">Sort by Packed Status</option>
				</select>
				<button onClick={handleClearItems}>Clear list</button>
			</div>
		</div>
	);
}
