import React, { useState, useMemo, useEffect } from 'react';
import './RoiCalculator.css';
import Navbar from '../components/Navbar';

const NEW_MEMBER_TENURE = 10;
const RETENTION_LIFT_PCT = 0.25;
const EXTRA_MONTHS = 8;
const PLAN_MONTHLY = 97;

function fmt(n) {
    const rounded = Math.round(n);
    if (rounded < 0) return '-$' + Math.abs(rounded).toLocaleString('en-US');
    return '$' + rounded.toLocaleString('en-US');
}

export default function RoiCalculator() {
    const [size, setSize] = useState(100);
    const [fee, setFee] = useState(50);
    const [lift, setLift] = useState(25);

    const [updateAnimation, setUpdateAnimation] = useState(false);

    useEffect(() => {
        setUpdateAnimation(true);
        const t = setTimeout(() => setUpdateAnimation(false), 300);
        return () => clearTimeout(t);
    }, [size, fee, lift]);

    const m = useMemo(() => {
        const annualPlanCost = PLAN_MONTHLY * 12;

        const liftDecimal = lift / 100;
        const extraSignupsPerYear = size * liftDecimal;
        const acqValue = extraSignupsPerYear * fee * NEW_MEMBER_TENURE;

        const retainedMembers = size * RETENTION_LIFT_PCT;
        const retValue = retainedMembers * fee * EXTRA_MONTHS;

        const grossValue = acqValue + retValue;
        const netProfit = grossValue;

        return {
            annualPlanCost,
            extraSignupsPerYear,
            acqValue,
            retainedMembers,
            retValue,
            grossValue,
            netProfit
        };
    }, [size, fee, lift]);

    const acqNumber = fmt(m.acqValue);
    const retNumber = fmt(m.retValue);
    const grandTotal = fmt(m.netProfit);
    const acqBreakdown = fmt(m.acqValue);
    const retBreakdown = fmt(m.retValue);

    const acqExtra = Math.round(m.extraSignupsPerYear);
    const acqFee = fee === 0 ? '$0' : '$' + fee;
    const retCount = Math.round(m.retainedMembers);
    const retFee = fee === 0 ? '$0' : '$' + fee;

    let ctaHead = '';
    if (m.netProfit > 50000) {
        ctaHead = `Unlock ${grandTotal} in new revenue this year.`;
    } else if (m.netProfit > 15000) {
        ctaHead = `Add ${grandTotal} to your annual revenue.`;
    } else if (m.netProfit > 0) {
        ctaHead = `An extra ${grandTotal} per year. From one perk.`;
    } else {
        ctaHead = 'A member perk that drives signups and retention.';
    }

    const animClass = updateAnimation ? " updating" : "";

    return (
        <div className="roi-calc-wrapper">
            <Navbar />
            <div className="container">

                <header className="header">
                    <div className="eyebrow">Member Growth Calculator</div>
                    <h1><span className="revenue">More signups.</span> <span className="accent">Longer tenure.</span><br />Real numbers.</h1>
                    <p className="subhead">Communities that add software deals as a member perk see big lifts on both signup conversion and retention. Plug in your numbers below to see what that's worth.</p>
                </header>

                <div className="input-strip">
                    <div className="input-strip-title">Tell me about your community</div>
                    <div className="input-strip-sub">Move the sliders to match your situation.</div>

                    <div className="input-grid">

                        <div className="input-block">
                            <div className="field-prompt">My community has...</div>
                            <div className="field-value-row">
                                <span className="field-value-big" id="sizeValue">{size >= 500 ? '500+' : size}</span>
                                <span className="field-value-unit">members</span>
                            </div>
                            <input type="range" id="sizeSlider" min="25" max="500" value={size} step="5" onChange={(e) => setSize(parseInt(e.target.value))} />
                            <div className="slider-range"><span>25</span><span>500+</span></div>
                        </div>

                        <div className="input-block">
                            <div className="field-prompt">My members pay...</div>
                            <div className="field-value-row">
                                <span className="field-value-big" id="feeValue">{fee === 0 ? 'Free' : '$' + fee}</span>
                                <span className="field-value-unit">/ month</span>
                            </div>
                            <input type="range" id="feeSlider" min="0" max="500" value={fee} step="5" onChange={(e) => setFee(parseInt(e.target.value))} />
                            <div className="slider-range"><span>Free</span><span>$500</span></div>
                        </div>

                        <div className="input-block">
                            <div className="field-prompt">Software discounts and ongoing engagement helps me grow by...</div>
                            <div className="field-value-row">
                                <span className="field-value-big" id="liftValue">{lift}%</span>
                                <span className="field-value-unit">extra signups / year</span>
                            </div>
                            <input type="range" id="liftSlider" min="10" max="100" value={lift} step="1" onChange={(e) => setLift(parseInt(e.target.value))} />
                            <div className="slider-range"><span>10%</span><span>100%</span></div>
                            <div className="field-subtext">We have seen 20-100% increases</div>
                        </div>

                    </div>
                </div>

                <div className="result-cards">

                    <div className="stat-card acquisition">
                        <div className="lift-percent" id="liftBadge">+{lift}% signups</div>
                        <div className="badge">New Revenue</div>
                        <div className={"stat-number" + animClass} id="acqNumber">{acqNumber}</div>
                        <div className="stat-headline">From extra signups</div>
                        <div className="stat-sub">Software discounts and ongoing engagement drive new signups from referrals and word-of-mouth.</div>
                        <div className="proof-line">Based on real community data</div>
                        <div className="stat-math">
                            <span className="formula-num" id="acqExtra">{acqExtra}</span> extra signups / yr<br />
                            &times; <span className="formula-num" id="acqFee">{acqFee}</span> / month<br />
                            &times; 10 months avg tenure
                        </div>
                    </div>

                    <div className="stat-card retention">
                        <div className="lift-percent">+25% retained</div>
                        <div className="badge">Retained Revenue</div>
                        <div className={"stat-number" + animClass} id="retNumber">{retNumber}</div>
                        <div className="stat-headline">From longer tenure</div>
                        <div className="stat-sub">25% of would-be churners stay an average of 8 more months.</div>
                        <div className="proof-line">Based on real community data</div>
                        <div className="stat-math">
                            <span className="formula-num" id="retCount">{retCount}</span> members retained<br />
                            &times; <span className="formula-num" id="retFee">{retFee}</span> / month<br />
                            &times; 8 extra months
                        </div>
                    </div>

                </div>

                <div className="grand-total">
                    <div className="grand-total-label">Your Annual Upside</div>
                    <div className={"grand-total-number" + animClass} id="grandTotal">{grandTotal}</div>
                    <div className="grand-total-sub">In new and retained revenue. Per year.</div>
                    <div className="grand-total-breakdown">
                        <span>New Revenue</span>
                        <span className="gross" id="acqBreakdown">{acqBreakdown}</span>
                        <span className="minus">plus</span>
                        <span>Retained Revenue</span>
                        <span className="gross" id="retBreakdown">{retBreakdown}</span>
                    </div>
                </div>

                <div className="cta-section">
                    <div className="cta-headline" id="ctaHeadline">{ctaHead}</div>
                    <div className="cta-sub">Branded deal portal, 580+ software discounts, live in under a day.</div>
                    <a href="https://www.membershipbenefits.club/pricing" className="cta-button">Start Free Trial</a>

                    <div className="plan-reveal">
                        <div className="plan-reveal-label">Simple Pricing</div>
                        <span className="plan-pill"><span className="num">$97</span>/mo<span className="desc">cancel anytime</span></span>
                    </div>
                </div>

                <details className="assumptions">
                    <summary>How we calculate this</summary>
                    <ul>
                        <li><strong>Acquisition lift:</strong> Software discounts and ongoing engagement drive new signups equal to the % you set, applied to your community size annually.</li>
                        <li><strong>New member tenure:</strong> Each new signup stays an average of 10 months at your stated fee.</li>
                        <li><strong>Retention lift:</strong> 25% of would-have-churned members stay 8 extra months because of the perk.</li>
                        <li><strong>Platform cost:</strong> $97/mo annualized.</li>
                    </ul>
                </details>

            </div>
        </div>
    );
}

