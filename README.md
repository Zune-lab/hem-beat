# Hem Beat

Game tạo nhạc kiểu Incredibox (tên lấy từ chữ "hẻm"), nhưng âm thanh là của xóm Việt Nam: trống, mõ, đàn bầu, đàn tranh, hò, còi xe máy, ve sầu, tiếng mưa, tiếng rao...

**Màn 1 · Hẻm Sài Gòn:** 7 nhân vật, 20 nhạc cụ chia 4 nhóm (Nhịp, Hiệu ứng, Giai điệu, Giọng).

## Cách chơi

- Kéo nhạc cụ ở khay dưới thả lên một người: người đó đổi trang phục và hát, nhạc vào ở nhịp kế tiếp.
- Thả nhạc cụ khác lên người đã có để đổi. Kéo người sang ô khác để đổi chỗ.
- Bấm vào người để tắt hoặc bật tiếng. Kéo người ra ngoài để gỡ nhạc cụ.
- Có 3 bonus ẩn: ghép đúng 4 nhạc cụ để mở khóa.
- Nút **Chia sẻ** copy link dạng `#mix-...` chứa cả bản mix của bạn.

## Kỹ thuật

- Không có file âm thanh nào: mọi tiếng đều được tạo bằng Web Audio API, nên repo rất nhẹ và không dính bản quyền.
- Một file `index.html`, không cần build. Mở thẳng hoặc đưa lên GitHub Pages.
- Thêm âm thanh mới: thêm một object vào mảng `S0` hoặc `NS` trong `index.html` (`p(t, s)` phát tiếng ở thời điểm `t`, bước `s` trong 32 bước), thêm trang phục tương ứng vào `L0` hoặc `NL`.

Repo gốc: https://github.com/Zune-lab/hem-beat