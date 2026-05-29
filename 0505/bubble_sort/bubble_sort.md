# 冒泡排序 (Bubble Sort)

## 程式用途

本程式實現經典的冒泡排序演算法，並提供排序過程可視化及性能測試功能。

冒泡排序是一種簡單的排序演算法，通過反覆比較相鄰元素並交換位置，使最大的元素逐漸「冒泡」到陣列末端。

## 使用方法

### 基本使用

```python
from bubble_sort import bubble_sort

arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(sorted_arr)  # [11, 12, 22, 25, 34, 64, 90]
```

### 開啟可視化

```python
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr, visualize=True)
```

輸出範例：
```
第 1 輪:
  交換 34 和 64: [34, 64, 25, 12, 22, 11, 90]
  交換 25 和 64: [34, 25, 64, 12, 22, 11, 90]
  ...
```

### 運行完整演示

```bash
python bubble_sort.py
```

## 程式功能

### 1. 基本排序
- 實現經典冒泡排序演算法
- 支援整數和浮點數
- 支援負數

### 2. 輸入驗證
- 檢查輸入是否為列表
- 檢查列表是否為空
- 檢查列表元素是否為數字

### 3. 可視化
- 顯示每輪交換過程
- 顯示每輪結束後的陣列狀態
- 可選擇開啟或關閉

### 4. 性能測試
- 測試不同規模數組 (100, 500)
- 測試不同數據類型 (隨機、已排序、逆序)
- 輸出執行時間

## 程式架構

### bubble_sort(arr, visualize=False)

| 參數 | 類型 | 說明 |
|------|------|------|
| arr | list | 要排序的數組 |
| visualize | bool | 是否顯示排序過程 (預設 False) |

| 返回值 | 類型 | 說明 |
|--------|------|------|
| sorted_arr | list | 排序後的數組 |

### validate_input(arr)

驗證輸入是否合法，拋出 TypeError 或 ValueError。

### performance_test()

執行性能測試並輸出結果。

## 時間/空間複雜度

| 複雜度 | 最佳 | 平均 | 最差 |
|--------|------|------|------|
| 時間 | O(n) | O(n²) | O(n²) |
| 空間 | O(1) | O(1) | O(1) |

- 最佳情況：數組已排序，只需遍歷一次
- 最差情況：數組逆序，需進行 n(n-1)/2 次比較

## 錯誤處理

```python
from bubble_sort import bubble_sort

# 空列表
bubble_sort([])  # ValueError: 列表不能為空

# 非列表輸入
bubble_sort("abc")  # TypeError: 輸入必須是列表

# 包含非數字元素
bubble_sort([1, 2, "a"])  # TypeError: 列表第 3 個元素不是數字: a
```