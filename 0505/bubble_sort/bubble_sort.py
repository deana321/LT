import time
import random


def validate_input(arr):
    if not isinstance(arr, list):
        raise TypeError("輸入必須是列表")
    if len(arr) == 0:
        raise ValueError("列表不能為空")
    for i, item in enumerate(arr):
        if not isinstance(item, (int, float)):
            raise TypeError(f"列表第 {i + 1} 個元素不是數字: {item}")
    return True


def bubble_sort(arr, visualize=False):
    if not validate_input(arr):
        return

    result = arr.copy()
    n = len(result)

    for i in range(n):
        swapped = False
        if visualize:
            print(f"第 {i + 1} 輪:")
        for j in range(0, n - i - 1):
            if result[j] > result[j + 1]:
                result[j], result[j + 1] = result[j + 1], result[j]
                swapped = True
                if visualize:
                    print(f"  交換 {result[j + 1]} 和 {result[j]}: {result}")
        if not swapped:
            break
        if visualize:
            print(f"  第 {i + 1} 輪結束: {result}")
            print()

    return result


def performance_test():
    test_cases = [
        ("隨機數組 (100)", [random.randint(0, 1000) for _ in range(100)]),
        ("已排序數組 (100)", list(range(100))),
        ("逆序數組 (100)", list(range(100, 0, -1))),
        ("隨機數組 (500)", [random.randint(0, 1000) for _ in range(500)]),
        ("已排序數組 (500)", list(range(500))),
        ("逆序數組 (500)", list(range(500, 0, -1))),
    ]

    print("=" * 50)
    print("性能測試")
    print("=" * 50)

    for name, arr in test_cases:
        start = time.time()
        bubble_sort(arr)
        end = time.time()
        print(f"{name}: {(end - start) * 1000:.2f} ms")


if __name__ == "__main__":
    print("=== 冒泡排序演示 ===")
    print()

    arr1 = [64, 34, 25, 12, 22, 11, 90]
    print(f"原始數組: {arr1}")
    print("開啟可視化:")
    sorted_arr = bubble_sort(arr1, visualize=True)
    print(f"排序結果: {sorted_arr}")
    print()

    arr2 = [5, 1, 4, 2, 8]
    print(f"原始數組: {arr2}")
    print("關閉可視化:")
    sorted_arr = bubble_sort(arr2, visualize=False)
    print(f"排序結果: {sorted_arr}")
    print()

    performance_test()