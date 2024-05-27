import { ref } from 'vue';

//当前商品Id
export const goodsId = ref(0);

//规格选项列表
export const sku_card_list = ref([]);

//初始化规格选项列表
export function initSkuCardList(d) {
	sku_card_list.value = d.goodsSkusCard.map((item) => {
		item.text = item.name;
		item.loading = false;
		item.goodsSkusCardValue.map((el) => {
			el.text = el.value || '属性值';
			return el;
		});
		return item;
	});
}

//初始化规格值
export function initSkuCardItem(id) {
	console.log('id', id);
	const item = sku_card_list.value.find((o) => o.id == id);
	console.log('item', item);
	return {
		item,
	};
	// sku_card_list.value = d.goodsSkusCard.map((item) => {
	// 	item.text = item.name;
	// 	item.loading = false;
	// 	item.goodsSkusCardValue.map((el) => {
	// 		el.text = el.value || '属性值';
	// 		return el;
	// 	});
	// 	return item;
	// });
}
